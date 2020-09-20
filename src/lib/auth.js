const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.comparePassword(password, user.password);
    
        if(validPassword){
            return done(null, user, req.flash('success', 'Welcome ' + user.username));//user se envía al serializer
        }else{
            return done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
    }else{
        return done(null, false, req.flash('message','El usuario no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({//Definición de la autenticación
    usernameField: 'username',  //username y password vienen del form
    passwordField: 'password',
    passReqToCallback: true     //Para acceder a req
}, async (req, username, password, done) => {
    const { fullname } = req.body;

    const newUser = {
        username,
        password,
        fullname
    };

    newUser.password = await helpers.encryptPassword(password);//Password cifrada
    const result = await db.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;

    return done(null, newUser);//newUser se envía al serializer
}));

passport.serializeUser((user, done) => {//user.id se envía al deserializer
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return done(null, rows[0]);//Único elemento del arreglo [0]
});

module.exports = passport;