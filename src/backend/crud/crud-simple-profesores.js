const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Profesores = require('../models/Profesores');

const rutaJson = path.join(__dirname, '..', 'test-jsons', 'profesores.json');
// Lee el archivo JSON de ejemplo
function leerMuestra(){return JSON.parse(fs.readFileSync(rutaJson,'utf8'));}

// Crea un nuevo profesor
async function crearProfesor(datos){const creado=await Profesores.create(datos);console.log('crearProfesor:',creado.toJSON());return creado}
// Obtiene todos los profesores
async function obtenerProfesores(){const filas=await Profesores.findAll();console.log('obtenerProfesores count=',filas.length);return filas.map(f=>f.toJSON())}
// Actualiza un profesor por id
async function actualizarProfesor(id,cambios){const inst=await Profesores.findByPk(id);if(!inst)return null;Object.keys(cambios).forEach(k=>inst.set(k,cambios[k]));await inst.save();console.log('actualizarProfesor:',inst.toJSON());return inst}
// Elimina un profesor por id
async function eliminarProfesor(id){const inst=await Profesores.findByPk(id);if(!inst)return false;await inst.destroy();console.log('eliminarProfesor id=',id);return true}

// Demo de uso
async function demostración(){try{await sequelize.sync();console.log('Demostración Profesores');await obtenerProfesores();const muestra=leerMuestra();const creado=await crearProfesor(muestra);await obtenerProfesores();await actualizarProfesor(creado.id||creado[Profesores.primaryKeyAttribute],{nombre:(muestra.nombre||'')+' - demostración'});await eliminarProfesor(creado.id||creado[Profesores.primaryKeyAttribute]);await sequelize.close();console.log('Demostración Profesores completada')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demostración();

module.exports={crearProfesor,obtenerProfesores,actualizarProfesor,eliminarProfesor};
