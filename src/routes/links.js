const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {//INDEX
    const links = await db.query('SELECT * FROM links');
    res.render('links/list', { links });
});

router.get('/add',(req, res) => {//CREATE
    res.render('links/add');
});

router.post('/add', async (req, res) => {//STORE
    const { title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description
    };

    await db.query('INSERT INTO links set ?', [newLink]);
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {//EDIT
    const { id } = req.params;
    const links = await db.query('SELECT * FROM links WHERE id  = ?', [id]); //Devuelve un array con un registro
    res.render('links/edit', {link : links[0] });
});

router.post('/update/:id', async (req, res) => {//UPDATE
    const { id } = req.params;
    const { title, url, description} = req.body;

    const link = {
        title,
        url,
        description
    };

    await db.query('UPDATE links set ? WHERE id = ?', [link, id]);
    res.redirect('/links');
});

router.get('/delete/:id', async (req, res) => {//DELETE
    const { id } = req.params;
    await db.query('DELETE FROM links WHERE id = ?', [id]);
    res.redirect('/links');
});

module.exports = router;