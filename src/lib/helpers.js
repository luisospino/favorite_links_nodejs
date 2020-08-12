const { format } = require('timeago.js');
const bcrypt = require('bcryptjs');

const helpers = {};//Objeto al que se le asignan métodos

helpers.timeago = (timestamp) => {
    return format(timestamp);
}

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);//Para generar un hash
    const hashPassword = await bcrypt.hash(password, salt);//Para cifrar el password basado en el hash generado
    
    return hashPassword;
}

helpers.comparePassword = async (password, hashPassword) => {
    try{
        return await bcrypt.compare(password, hashPassword);
    }catch(error) {
        console.log(error);
    }
}

helpers.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/signin');
}

helpers.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/profile');
}

module.exports = helpers;