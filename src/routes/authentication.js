const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/helpers');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
}));

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();//Cerrar la sesión
    res.redirect('/signin');
});

module.exports = router;