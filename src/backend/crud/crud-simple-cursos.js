const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Cursos = require('../models/Cursos');

const rutaJson = path.join(__dirname, '..', 'test-jsons', 'cursos.json');
// Lee el archivo JSON de ejemplo
function leerMuestra(){return JSON.parse(fs.readFileSync(rutaJson,'utf8'));}

// Crea un nuevo curso
async function crearCurso(datos){const creado=await Cursos.create(datos);console.log('crearCurso:',creado.toJSON());return creado}
// Obtiene todos los cursos
async function obtenerCursos(){const filas=await Cursos.findAll();console.log('obtenerCursos count=',filas.length);return filas.map(f=>f.toJSON())}
// Actualiza un curso por id
async function actualizarCurso(id,cambios){const inst=await Cursos.findByPk(id);if(!inst)return null;Object.keys(cambios).forEach(k=>inst.set(k,cambios[k]));await inst.save();console.log('actualizarCurso:',inst.toJSON());return inst}
// Elimina un curso por id
async function eliminarCurso(id){const inst=await Cursos.findByPk(id);if(!inst)return false;await inst.destroy();console.log('eliminarCurso id=',id);return true}

// Demo de uso
async function demostración(){try{await sequelize.sync();console.log('Demostración Cursos');await obtenerCursos();const muestra=leerMuestra();const creado=await crearCurso(muestra);await obtenerCursos();await actualizarCurso(creado.id||creado[Cursos.primaryKeyAttribute],{nombreCurso:(muestra.nombreCurso||'')+' - demostración'});await eliminarCurso(creado.id||creado[Cursos.primaryKeyAttribute]);await sequelize.close();console.log('Demostración Cursos completada')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demostración();

module.exports={crearCurso,obtenerCursos,actualizarCurso,eliminarCurso};
