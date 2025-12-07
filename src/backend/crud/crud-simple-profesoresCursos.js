const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const ProfesoresCursos = require('../models/ProfesoresCursos');

const rutaJson = path.join(__dirname, '..', 'test-jsons', 'profesoresCursos.json');
// Lee el archivo JSON de ejemplo
function leerMuestra(){return JSON.parse(fs.readFileSync(rutaJson,'utf8'));}

// Crea una nueva relación profesor-curso
async function crearProfesorCurso(datos){const creado=await ProfesoresCursos.create(datos);console.log('crearProfesorCurso:',creado.toJSON());return creado}
// Obtiene todas las relaciones profesor-curso
async function obtenerProfesoresCursos(){const filas=await ProfesoresCursos.findAll();console.log('obtenerProfesoresCursos count=',filas.length);return filas.map(f=>f.toJSON())}
// Actualiza una relación profesor-curso por id
async function actualizarProfesorCurso(id,cambios){const inst=await ProfesoresCursos.findByPk(id);if(!inst)return null;Object.keys(cambios).forEach(k=>inst.set(k,cambios[k]));await inst.save();console.log('actualizarProfesorCurso:',inst.toJSON());return inst}
// Elimina una relación profesor-curso por id
async function eliminarProfesorCurso(id){const inst=await ProfesoresCursos.findByPk(id);if(!inst)return false;await inst.destroy();console.log('eliminarProfesorCurso id=',id);return true}

// Demo de uso
async function demostración(){try{await sequelize.sync();console.log('Demostración ProfesoresCursos');await obtenerProfesoresCursos();const muestra=leerMuestra();const creado=await crearProfesorCurso(muestra);await obtenerProfesoresCursos();await actualizarProfesorCurso(creado.id||creado[ProfesoresCursos.primaryKeyAttribute],{profesorId:muestra.profesorId});await eliminarProfesorCurso(creado.id||creado[ProfesoresCursos.primaryKeyAttribute]);await sequelize.close();console.log('Demostración ProfesoresCursos completada')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demostración();

module.exports={crearProfesorCurso,obtenerProfesoresCursos,actualizarProfesorCurso,eliminarProfesorCurso};
