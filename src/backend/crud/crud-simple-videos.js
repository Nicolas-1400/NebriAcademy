const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Videos = require('../models/Videos');

const rutaJson = path.join(__dirname, '..', 'test-jsons', 'videos.json');
// Lee el archivo JSON de ejemplo
function leerMuestra(){return JSON.parse(fs.readFileSync(rutaJson,'utf8'));}

// Crea un nuevo video
async function crearVideo(datos){const creado=await Videos.create(datos);console.log('crearVideo:',creado.toJSON());return creado}
// Obtiene todos los videos
async function obtenerVideos(){const filas=await Videos.findAll();console.log('obtenerVideos count=',filas.length);return filas.map(f=>f.toJSON())}
// Actualiza un video por id
async function actualizarVideo(id,cambios){const inst=await Videos.findByPk(id);if(!inst)return null;Object.keys(cambios).forEach(k=>inst.set(k,cambios[k]));await inst.save();console.log('actualizarVideo:',inst.toJSON());return inst}
// Elimina un video por id
async function eliminarVideo(id){const inst=await Videos.findByPk(id);if(!inst)return false;await inst.destroy();console.log('eliminarVideo id=',id);return true}

// Demo de uso
async function demostración(){try{await sequelize.sync();console.log('Demostración Videos');await obtenerVideos();const muestra=leerMuestra();const creado=await crearVideo(muestra);await obtenerVideos();await actualizarVideo(creado.id||creado[Videos.primaryKeyAttribute],{duracion:(muestra.duracion||0)+1});await eliminarVideo(creado.id||creado[Videos.primaryKeyAttribute]);await sequelize.close();console.log('Demostración Videos completada')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demostración();

module.exports={crearVideo,obtenerVideos,actualizarVideo,eliminarVideo};
