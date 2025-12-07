const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const PuntuacionesEjercicios = require('../models/PuntuacionesEjercicios');

const rutaJson = path.join(__dirname, '..', 'test-jsons', 'puntuacionesEjercicios.json');
// Lee el archivo JSON de ejemplo
function leerMuestra(){return JSON.parse(fs.readFileSync(rutaJson,'utf8'));}

// Crea una nueva puntuación de ejercicio
async function crearPuntuacionEjercicio(datos){const creado=await PuntuacionesEjercicios.create(datos);console.log('crearPuntuacionEjercicio:',creado.toJSON());return creado}
// Obtiene todas las puntuaciones de ejercicios
async function obtenerPuntuacionesEjercicios(){const filas=await PuntuacionesEjercicios.findAll();console.log('count=',filas.length);return filas.map(f=>f.toJSON())}
// Actualiza una puntuación de ejercicio por id
async function actualizarPuntuacionEjercicio(id,cambios){const inst=await PuntuacionesEjercicios.findByPk(id);if(!inst)return null;Object.keys(cambios).forEach(k=>inst.set(k,cambios[k]));await inst.save();console.log('actualizar:',inst.toJSON());return inst}
// Elimina una puntuación de ejercicio por id
async function eliminarPuntuacionEjercicio(id){const inst=await PuntuacionesEjercicios.findByPk(id);if(!inst)return false;await inst.destroy();console.log('eliminar id=',id);return true}

// Demo de uso
async function demostración(){try{await sequelize.sync();console.log('Demostración PuntuacionesEjercicios');await obtenerPuntuacionesEjercicios();const muestra=leerMuestra();const creado=await crearPuntuacionEjercicio(muestra);await obtenerPuntuacionesEjercicios();await actualizarPuntuacionEjercicio(creado.id||creado[PuntuacionesEjercicios.primaryKeyAttribute],{puntuacion:(muestra.puntuacion||0)+1});await eliminarPuntuacionEjercicio(creado.id||creado[PuntuacionesEjercicios.primaryKeyAttribute]);await sequelize.close();console.log('Demostración completada')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demostración();

module.exports={crearPuntuacionEjercicio,obtenerPuntuacionesEjercicios,actualizarPuntuacionEjercicio,eliminarPuntuacionEjercicio};
