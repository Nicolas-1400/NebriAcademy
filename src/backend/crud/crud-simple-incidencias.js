const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Incidencias = require('../models/Incidencias');

const rutaJson = path.join(__dirname, '..', 'test-jsons', 'incidencias.json');
// Lee el archivo JSON de ejemplo
function leerMuestra(){return JSON.parse(fs.readFileSync(rutaJson,'utf8'));}

// Crea una nueva incidencia
async function crearIncidencia(datos){const creado=await Incidencias.create(datos);console.log('crearIncidencia:',creado.toJSON());return creado}
// Obtiene todas las incidencias
async function obtenerIncidencias(){const filas=await Incidencias.findAll();console.log('obtenerIncidencias count=',filas.length);return filas.map(f=>f.toJSON())}
// Actualiza una incidencia por id
async function actualizarIncidencia(id,cambios){const inst=await Incidencias.findByPk(id);if(!inst)return null;Object.keys(cambios).forEach(k=>inst.set(k,cambios[k]));await inst.save();console.log('actualizarIncidencia:',inst.toJSON());return inst}
// Elimina una incidencia por id
async function eliminarIncidencia(id){const inst=await Incidencias.findByPk(id);if(!inst)return false;await inst.destroy();console.log('eliminarIncidencia id=',id);return true}

// Demo de uso
async function demostración(){try{await sequelize.sync();console.log('Demostración Incidencias');await obtenerIncidencias();const muestra=leerMuestra();const creado=await crearIncidencia(muestra);await obtenerIncidencias();await actualizarIncidencia(creado.id||creado[Incidencias.primaryKeyAttribute],{tipo:(muestra.tipo||'')+' - demostración'});await eliminarIncidencia(creado.id||creado[Incidencias.primaryKeyAttribute]);await sequelize.close();console.log('Demostración Incidencias completada')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demostración();

module.exports={crearIncidencia,obtenerIncidencias,actualizarIncidencia,eliminarIncidencia};
