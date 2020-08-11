const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');//Requiere de una sesión
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { DDBB } = require('./keys');

//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine','.hbs');

//Middewares
app.use(session({
    secret: 'node_mysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(DDBB)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting Server

app.listen(app.get('port'), () => {
    console.log('server on port',app.get('port'));
});