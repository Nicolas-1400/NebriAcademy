const express = require('express');
const app = express();

app.use(express.json());

// Rutas
app.use('/administradores', require('./routes/administradores'));
/* app.use('/alumnos', require('./routes/alumnos'));
app.use('/apuntes', require('./routes/apuntes'));
app.use('/cursos', require('./routes/cursos'));
app.use('/cursosAlumnos', require('./routes/cursosAlumnos'));
app.use('/ejercicios', require('./routes/ejercicios'));
app.use('/incidencias', require('./routes/incidencias'));
app.use('/profesores', require('./routes/profesores'));
app.use('/profesoresCursos', require('./routes/profesoresCursos'));
app.use('/puntuacionesEjercicios', require('./routes/puntuacionesEjercicios'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/videos', require('./routes/videos')); */

// Inica el servidor
app.listen(3000, () => console.log('Servidor ejecutándose en http://localhost:3000'));