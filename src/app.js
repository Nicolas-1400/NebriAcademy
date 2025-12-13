const express = require('express');
const app = express();

app.use(express.json());

// Rutas
app.get('/', (req, res) => {
	res.send("Pagina principal de la API de NebriAcademy<br><br>Para poder ver los JSON de cada tabla con todos sus datos, poner en la URL localhost:3000/nombre de la tabla.<br>Para ver los JSON de un registro en concreto, poner en la URL localhost:3000/nombre de la tabla/id del registro.<br><br>Tablas disponibles:<br>/administradores<br>/alumnos<br>/apuntes<br>/cursos<br>/cursosalumnos<br>/ejercicios<br>/incidencias<br>/profesores<br>/profesorescursos<br>/puntuacionesejercicios<br>/usuarios<br>/videos");
});

// Rutas por recurso
app.use('/', require('./routes/index'));
app.use('/administradores', require('./routes/administradores'));
app.use('/alumnos', require('./routes/alumnos'));
app.use('/apuntes', require('./routes/apuntes'));
app.use('/cursos', require('./routes/cursos'));
app.use('/cursosalumnos', require('./routes/cursosalumnos'));
app.use('/ejercicios', require('./routes/ejercicios'));
app.use('/incidencias', require('./routes/incidencias'));
app.use('/profesores', require('./routes/profesores'));
app.use('/profesorescursos', require('./routes/profesorescursos'));
app.use('/puntuacionesejercicios', require('./routes/puntuacionesejercicios'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/videos', require('./routes/videos'));

// Inica el servidor
app.listen(3000, () => console.log('Servidor ejecutándose en http://localhost:3000'));