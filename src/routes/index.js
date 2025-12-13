const express = require('express');
const router = express.Router();

const Administradores = require('../models/Administradores.js');
const Alumnos = require('../models/Alumnos.js');
const Apuntes = require('../models/Apuntes.js');
const Cursos = require('../models/Cursos.js');
const CursosAlumnos = require('../models/CursosAlumnos.js');
const Ejercicios = require('../models/Ejercicios.js');
const Incidencias = require('../models/Incidencias.js');
const Profesores = require('../models/Profesores.js');
const ProfesoresCursos = require('../models/ProfesoresCursos.js');
const PuntuacionesEjercicios = require('../models/PuntuacionesEjercicios.js');
const Usuarios = require('../models/Usuarios.js');
const Videos = require('../models/Videos.js');

router.get('/', (req, res) => {
	res.send("Pagina principal de la API de NebriAcademy<br><br>Para poder ver los JSON de cada tabla con todos sus datos, poner en la URL localhost:3000/nombre de la tabla.<br>Para ver los JSON de un registro en concreto, poner en la URL localhost:3000/nombre de la tabla/id del registro.<br><br>Tablas disponibles:<br>/administradores<br>/alumnos<br>/apuntes<br>/cursos<br>/cursosalumnos<br>/ejercicios<br>/incidencias<br>/profesores<br>/profesorescursos<br>/puntuacionesejercicios<br>/usuarios<br>/videos");
});

// Obtener todos los administradores
router.get('/administradores', (req, res) => {
    console.log('GET /administradores');
    Administradores.findAll().then(resultado => {
            res.json({ "Numero de administradores": resultado.length, "Administradores": resultado });
        });
});

router.get('/alumnos', (req, res) => {
	console.log('GET /alumnos');
	Alumnos.findAll().then(resultado => {
			res.json({ "Numero de alumnos": resultado.length, "Alumnos": resultado });
		});
});

// Obtener todos los apuntes
router.get('/apuntes', (req, res) => {
	console.log('GET /apuntes');
	Apuntes.findAll().then(resultado => {
			res.json({ "Numero de apuntes": resultado.length, "Apuntes": resultado });
		});
});

// Obtener todos los cursos
router.get('/cursos', (req, res) => {
	console.log('GET /cursos');
	Cursos.findAll().then(resultado => {
			res.json({ "Numero de cursos": resultado.length, "Cursos": resultado });
		});
});

// Obtener todos los cursos-alumnos
router.get('/cursosalumnos', (req, res) => {
	console.log('GET /cursosAlumnos');
	CursosAlumnos.findAll().then(resultado => {
			res.json({ "Numero de cursosAlumnos": resultado.length, "CursosAlumnos": resultado });
		});
});

// Obtener todos los ejercicios
router.get('/ejercicios', (req, res) => {
	console.log('GET /ejercicios');
	Ejercicios.findAll().then(resultado => {
			res.json({ "Numero de ejercicios": resultado.length, "Ejercicios": resultado });
		});
});

// Obtener todas las incidencias
router.get('/incidencias', (req, res) => {
	console.log('GET /incidencias');
	Incidencias.findAll().then(resultado => {
			res.json({ "Numero de incidencias": resultado.length, "Incidencias": resultado });
		});
});

// Obtener todos los profesores
router.get('/profesores', (req, res) => {
	console.log('GET /profesores');
	Profesores.findAll().then(resultado => {
			res.json({ "Numero de profesores": resultado.length, "Profesores": resultado });
		});
});

// Obtener todos los profesores-cursos
router.get('/profesorescursos', (req, res) => {
	console.log('GET /profesoresCursos');
	ProfesoresCursos.findAll().then(resultado => {
			res.json({ "Numero de profesoresCursos": resultado.length, "ProfesoresCursos": resultado });
		});
});

// Obtener todas las puntuaciones de ejercicios
router.get('/puntuacionesejercicios', (req, res) => {
	console.log('GET /puntuacionesEjercicios');
	PuntuacionesEjercicios.findAll().then(resultado => {
			res.json({ "Numero de puntuacionesEjercicios": resultado.length, "PuntuacionesEjercicios": resultado });
		});
});

// Obtener todos los usuarios
router.get('/usuarios', (req, res) => {
	console.log('GET /usuarios');
	Usuarios.findAll().then(resultado => {
			res.json({ "Numero de usuarios": resultado.length, "Usuarios": resultado });
		});
});

// Obtener todos los videos
router.get('/videos', (req, res) => {
	console.log('GET /videos');
	Videos.findAll().then(resultado => {
			res.json({ "Numero de videos": resultado.length, "Videos": resultado });
		});
});

// Obtener por ID un administrador
router.get('/administradores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`GET /administradores/${id}`);
     Administradores.findAll().then(resultado => {
        const administrador = resultado.find(a => a.id === id);
        if (administrador) {
            res.json(administrador);
        } else {
            res.status(404).json({ error: 'Administrador no encontrado' });
     }
    });
});

// Obtener por ID un alumno
router.get('/alumnos/:id', (req, res) => {
	const id = parseInt(req.params.id);
	console.log(`GET /alumnos/${id}`);
	 Alumnos.findAll().then(resultado => {
		const alumno = resultado.find(a => a.id === id);
		if (alumno) {
			res.json(alumno);
		} else {
			res.status(404).json({ error: 'Alumno no encontrado' });
	 }
	});
});

// Obtener por ID un apunte
router.get('/apuntes/:id', (req, res) => {
	const id = parseInt(req.params.id);
	console.log(`GET /apuntes/${id}`);
	 Apuntes.findAll().then(resultado => {
		const apunte = resultado.find(a => a.id === id);
		if (apunte) {
			res.json(apunte);
		} else {
			res.status(404).json({ error: 'Apunte no encontrado' });
	 }
	});
});

// Obtener por ID un curso
router.get('/cursos/:id', (req, res) => {
	const id = parseInt(req.params.id);
	console.log(`GET /cursos/${id}`);
	 Cursos.findAll().then(resultado => {
		const curso = resultado.find(c => c.id === id);
		if (curso) {
			res.json(curso);
		} else {
			res.status(404).json({ error: 'Curso no encontrado' });
	 }
	});
});

// Obtener por ID un registro curso-alumno
router.get('/cursosalumnos/:id', (req, res) => {
	const id = parseInt(req.params.id);
	console.log(`GET /cursosalumnos/${id}`);
	 CursosAlumnos.findAll().then(resultado => {
		const registro = resultado.find(r => r.id === id);
		if (registro) {
			res.json(registro);
		} else {
			res.status(404).json({ error: 'Registro curso-alumno no encontrado' });
	 }
	});
});

// Obtener por ID un ejercicio
router.get('/ejercicios/:id', (req, res) => {
	const id = parseInt(req.params.id);
	console.log(`GET /ejercicios/${id}`);
	 Ejercicios.findAll().then(resultado => {
		const ejercicio = resultado.find(e => e.id === id);
		if (ejercicio) {
			res.json(ejercicio);
		} else {
			res.status(404).json({ error: 'Ejercicio no encontrado' });
	 }
	});
});

// Obtener por ID una incidencia
router.get('/incidencias/:id', (req, res) => {
	const id = parseInt(req.params.id);
	console.log(`GET /incidencias/${id}`);
	 Incidencias.findAll().then(resultado => {
		const incidencia = resultado.find(i => i.id === id);
		if (incidencia) {
			res.json(incidencia);
		} else {
			res.status(404).json({ error: 'Incidencia no encontrada' });
	 }
	});
});

// Obtener por ID un profesor
router.get('/profesores/:id', (req, res) => {
	const id = parseInt(req.params.id);
	console.log(`GET /profesores/${id}`);
	 Profesores.findAll().then(resultado => {
		const profesor = resultado.find(p => p.id === id);
		if (profesor) {
			res.json(profesor);
		} else {
			res.status(404).json({ error: 'Profesor no encontrado' });
	 }
	});
});

// Obtener por ID un profesor-curso
router.get('/profesorescursos/:id', (req, res) => {
	const id = parseInt(req.params.id);
	console.log(`GET /profesorescursos/${id}`);
	 ProfesoresCursos.findAll().then(resultado => {
		const registro = resultado.find(r => r.id === id);
		if (registro) {
			res.json(registro);
		} else {
			res.status(404).json({ error: 'Registro profesor-curso no encontrado' });
	 }
	});
});

// Obtener por ID una puntuación de ejercicio
router.get('/puntuacionesejercicios/:id', (req, res) => {
	const id = parseInt(req.params.id);
	console.log(`GET /puntuacionesejercicios/${id}`);
	 PuntuacionesEjercicios.findAll().then(resultado => {
		const puntuacion = resultado.find(p => p.id === id);
		if (puntuacion) {
			res.json(puntuacion);
		} else {
			res.status(404).json({ error: 'Puntuación no encontrada' });
	 }
	});
});

// Obtener por ID un usuario
router.get('/usuarios/:id', (req, res) => {
	const id = parseInt(req.params.id);
	console.log(`GET /usuarios/${id}`);
	 Usuarios.findAll().then(resultado => {
		const usuario = resultado.find(u => u.id === id);
		if (usuario) {
			res.json(usuario);
		} else {
			res.status(404).json({ error: 'Usuario no encontrado' });
	 }
	});
});

// Obtener por ID un video
router.get('/videos/:id', (req, res) => {
	const id = parseInt(req.params.id);
	console.log(`GET /videos/${id}`);
	 Videos.findAll().then(resultado => {
		const video = resultado.find(v => v.id === id);
		if (video) {
			res.json(video);
		} else {
			res.status(404).json({ error: 'Video no encontrado' });
	 }
	});
});

module.exports = router;