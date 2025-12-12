import { where } from 'sequelize';
import sequelize from '../database/connection.js';
import Administradores from '../models/Administradores.js';
import Alumnos from '../models/Alumnos.js';
import Apuntes from '../models/Apuntes.js';
import Cursos from '../models/Cursos.js';
import CursosAlumnos from '../models/CursosAlumnos.js';
import Ejercicios from '../models/Ejercicios.js';
import Incidencias from '../models/Incidencias.js';
import Profesores from '../models/Profesores.js';
import ProfesoresCursos from '../models/ProfesoresCursos.js';
import PuntuacionesEjercicios from '../models/PuntuacionesEjercicios.js';
import Usuarios from '../models/Usuarios.js';
import Videos from '../models/Videos.js';

// SELECCIONAR TODOS LOS REGISTROS DE LA TABLA ADMINISTRADORES
sequelize.sync().then(() => {
        console.log("Acceso a la tabla de juegos exitoso.")

        Administradores.findAll({
            where:{
                nombre: "Ramiro"
        }}).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error('Falla la selección de los registros:', error);
        })
}).catch((error) => {
    console.error('No se ha podido acceder a la tabla', error);
});

/* // SELECCIONAR TODOS LOS REGISTROS DE LA TABLA ALUMNOS
sequelize.sync().then(() => {
        console.log("Acceso a la tabla de juegos exitoso.")

        Alumnos.findAll().then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error('Falla la selección de los registros:', error);
        })
}).catch((error) => {
    console.error('No se ha podido acceder a la tabla', error);
});

// SELECCIONAR TODOS LOS REGISTROS DE LA TABLA APUNTES
sequelize.sync().then(() => {
        console.log("Acceso a la tabla de juegos exitoso.")

        Apuntes.findAll().then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error('Falla la selección de los registros:', error);
        })
}).catch((error) => {
    console.error('No se ha podido acceder a la tabla', error);
});

// SELECCIONAR TODOS LOS REGISTROS DE LA TABLA CURSOS
sequelize.sync().then(() => {
    console.log("Acceso a la tabla de cursos exitoso.")
    Cursos.findAll().then((res) => {
        console.log(res);
    }).catch((error) => {
        console.error('Falla la selección de los registros:', error);
    })
}).catch((error) => {
    console.error('No se ha podido acceder a la tabla', error);
});

// SELECCIONAR TODOS LOS REGISTROS DE LA TABLA CURSOSALUMNOS
sequelize.sync().then(() => {
        console.log("Acceso a la tabla de juegos exitoso.")

        CursosAlumnos.findAll().then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error('Falla la selección de los registros:', error);
        })
}).catch((error) => {
    console.error('No se ha podido acceder a la tabla', error);
});

// SELECCIONAR TODOS LOS REGISTROS DE LA TABLA EJERCICIOS
sequelize.sync().then(() => {
        console.log("Acceso a la tabla de juegos exitoso.")

        Ejercicios.findAll().then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error('Falla la selección de los registros:', error);
        })
}).catch((error) => {
    console.error('No se ha podido acceder a la tabla', error);
});

// SELECCIONAR TODOS LOS REGISTROS DE LA TABLA INCIDENCIAS
sequelize.sync().then(() => {
        console.log("Acceso a la tabla de juegos exitoso.")

        Incidencias.findAll().then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error('Falla la selección de los registros:', error);
        })
}).catch((error) => {
    console.error('No se ha podido acceder a la tabla', error);
});

// SELECCIONAR TODOS LOS REGISTROS DE LA TABLA PROFESORES
sequelize.sync().then(() => {
    console.log("Acceso a la tabla de profesores exitoso.")
    Profesores.findAll().then((res) => {
        console.log(res);
    }).catch((error) => {
        console.error('Falla la selección de los registros:', error);
    })
}).catch((error) => {
    console.error('No se ha podido acceder a la tabla', error);
});

// SELECCIONAR TODOS LOS REGISTROS DE LA TABLA PROFESORESCURSOS
sequelize.sync().then(() => {
        console.log("Acceso a la tabla de juegos exitoso.")

        ProfesoresCursos.findAll().then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error('Falla la selección de los registros:', error);
        })
}).catch((error) => {
    console.error('No se ha podido acceder a la tabla', error);
});

// SELECCIONAR TODOS LOS REGISTROS DE LA TABLA PUNTUACIONESEJERCICIOS
sequelize.sync().then(() => {
        console.log("Acceso a la tabla de juegos exitoso.")

        PuntuacionesEjercicios.findAll().then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error('Falla la selección de los registros:', error);
        })
}).catch((error) => {
    console.error('No se ha podido acceder a la tabla', error);
});

// SELECCIONAR TODOS LOS REGISTROS DE LA TABLA USUARIOS
sequelize.sync().then(() => {
    console.log("Acceso a la tabla de usuarios exitoso.")
    Usuarios.findAll().then((res) => {
        console.log(res);
    }).catch((error) => {
        console.error('Falla la selección de los registros:', error);
    })
}).catch((error) => {
    console.error('No se ha podido acceder a la tabla', error);
});

// SELECCIONAR TODOS LOS REGISTROS DE LA TABLA VIDEOS
sequelize.sync().then(() => {
        console.log("Acceso a la tabla de juegos exitoso.")

        Videos.findAll().then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error('Falla la selección de los registros:', error);
        })
}).catch((error) => {
    console.error('No se ha podido acceder a la tabla', error);
});

 */