const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Ejercicios = require('../models/Ejercicios');

const rutaJson = path.join(__dirname, '..', 'test-jsons', 'ejercicios.json');
// Lee el archivo JSON de ejemplo
function leerMuestra(){return JSON.parse(fs.readFileSync(rutaJson,'utf8'));}

// Crea un nuevo ejercicio
async function crearEjercicio(datos){const creado=await Ejercicios.create(datos);console.log('crearEjercicio:',creado.toJSON());return creado}
// Obtiene todos los ejercicios
async function obtenerEjercicios(){const filas=await Ejercicios.findAll();console.log('obtenerEjercicios count=',filas.length);return filas.map(f=>f.toJSON())}
// Actualiza un ejercicio por id
async function actualizarEjercicio(id,cambios){const inst=await Ejercicios.findByPk(id);if(!inst)return null;Object.keys(cambios).forEach(k=>inst.set(k,cambios[k]));await inst.save();console.log('actualizarEjercicio:',inst.toJSON());return inst}
// Elimina un ejercicio por id
async function eliminarEjercicio(id){const inst=await Ejercicios.findByPk(id);if(!inst)return false;await inst.destroy();console.log('eliminarEjercicio id=',id);return true}

// Demo de uso
async function demostración(){try{await sequelize.sync();console.log('Demostración Ejercicios');await obtenerEjercicios();const muestra=leerMuestra();const creado=await crearEjercicio(muestra);await obtenerEjercicios();await actualizarEjercicio(creado.id||creado[Ejercicios.primaryKeyAttribute],{valoracion:(muestra.valoracion||0)+1});await eliminarEjercicio(creado.id||creado[Ejercicios.primaryKeyAttribute]);await sequelize.close();console.log('Demostración Ejercicios completada')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demostración();

module.exports={crearEjercicio,obtenerEjercicios,actualizarEjercicio,eliminarEjercicio};
