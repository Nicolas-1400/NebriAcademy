const express = require('express');
const app = express();

app.use(express.json());

// Rutas
app.use('/', require('./routes/index.js'));

// Inica el servidor
app.listen(3000, () => console.log('Servidor ejecutándose en http://localhost:3000'));