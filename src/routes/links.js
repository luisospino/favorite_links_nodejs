const express = require('express');
const router = express.Router();
const db = require('../database');

const { isLoggedIn } = require('../lib/helpers');

router.get('/', isLoggedIn, async (req, res) => {//INDEX
    const links = await db.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
});

router.get('/add', isLoggedIn, (req, res) => {//CREATE
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {//STORE
    const { title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };

    await db.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link creado exitosamente!');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {//EDIT
    const { id } = req.params;
    const links = await db.query('SELECT * FROM links WHERE id  = ?', [id]); //Devuelve un array con un registro
    res.render('links/edit', {link : links[0] });
});

router.post('/update/:id', isLoggedIn, async (req, res) => {//UPDATE
    const { id } = req.params;
    const { title, url, description} = req.body;

    const link = {
        title,
        url,
        description
    };

    await db.query('UPDATE links set ? WHERE id = ?', [link, id]);
    req.flash('success', 'Link actualizado exitosamente!');
    res.redirect('/links');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {//DELETE
    const { id } = req.params;
    await db.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Link eliminado exitosamente!');
    res.redirect('/links');
});

module.exports = router;