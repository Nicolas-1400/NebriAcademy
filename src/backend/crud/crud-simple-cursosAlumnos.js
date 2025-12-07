const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const CursosAlumnos = require('../models/CursosAlumnos');

const rutaJson = path.join(__dirname, '..', 'test-jsons', 'cursosAlumnos.json');
// Lee el archivo JSON de ejemplo
function leerMuestra(){return JSON.parse(fs.readFileSync(rutaJson,'utf8'));}

// Crea una nueva relación curso-alumno
async function crearCursoAlumno(datos){const creado=await CursosAlumnos.create(datos);console.log('crearCursoAlumno:',creado.toJSON());return creado}
// Obtiene todas las relaciones curso-alumno
async function obtenerCursosAlumnos(){const filas=await CursosAlumnos.findAll();console.log('obtenerCursosAlumnos count=',filas.length);return filas.map(f=>f.toJSON())}
// Actualiza una relación curso-alumno por id
async function actualizarCursoAlumno(id,cambios){const inst=await CursosAlumnos.findByPk(id);if(!inst)return null;Object.keys(cambios).forEach(k=>inst.set(k,cambios[k]));await inst.save();console.log('actualizarCursoAlumno:',inst.toJSON());return inst}
// Elimina una relación curso-alumno por id
async function eliminarCursoAlumno(id){const inst=await CursosAlumnos.findByPk(id);if(!inst)return false;await inst.destroy();console.log('eliminarCursoAlumno id=',id);return true}

// Demo de uso
async function demostración(){try{await sequelize.sync();console.log('Demostración CursosAlumnos');await obtenerCursosAlumnos();const muestra=leerMuestra();const creado=await crearCursoAlumno(muestra);await obtenerCursosAlumnos();await actualizarCursoAlumno(creado.id||creado[CursosAlumnos.primaryKeyAttribute],{cursoId:muestra.cursoId});await eliminarCursoAlumno(creado.id||creado[CursosAlumnos.primaryKeyAttribute]);await sequelize.close();console.log('Demostración CursosAlumnos completada')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demostración();

module.exports={crearCursoAlumno,obtenerCursosAlumnos,actualizarCursoAlumno,eliminarCursoAlumno};
