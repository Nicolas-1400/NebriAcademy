import administradores from '../data/administradores.js';
const express = require('express');
const router = express.Router();

router.get('/', (res) => {
    console.log('GET /administradores');
    res.json({ numAdmins: administradores.length, administradores });
});

module.exports = router;

