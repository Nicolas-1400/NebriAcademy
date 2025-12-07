const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Apuntes = require('../models/Apuntes');

const rutaJson = path.join(__dirname, '..', 'test-jsons', 'apuntes.json');
// Lee el archivo JSON de ejemplo
function leerMuestra(){return JSON.parse(fs.readFileSync(rutaJson,'utf8'));}

// Crea un nuevo apunte
async function crearApunte(datos){const creado=await Apuntes.create(datos);console.log('crearApunte:',creado.toJSON());return creado}
// Obtiene todos los apuntes
async function obtenerApuntes(){const filas=await Apuntes.findAll();console.log('obtenerApuntes count=',filas.length);return filas.map(f=>f.toJSON())}
// Actualiza un apunte por id
async function actualizarApunte(id,cambios){const inst=await Apuntes.findByPk(id);if(!inst)return null;Object.keys(cambios).forEach(k=>inst.set(k,cambios[k]));await inst.save();console.log('actualizarApunte:',inst.toJSON());return inst}
// Elimina un apunte por id
async function eliminarApunte(id){const inst=await Apuntes.findByPk(id);if(!inst)return false;await inst.destroy();console.log('eliminarApunte id=',id);return true}

// Demo de uso
async function demostración(){try{await sequelize.sync();console.log('Demostración Apuntes');await obtenerApuntes();const muestra=leerMuestra();const creado=await crearApunte(muestra);await obtenerApuntes();await actualizarApunte(creado.id||creado[Apuntes.primaryKeyAttribute],{contenido:(muestra.contenido||'')+' - demostración'});await eliminarApunte(creado.id||creado[Apuntes.primaryKeyAttribute]);await sequelize.close();console.log('Demostración Apuntes completada')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demostración();

module.exports={crearApunte,obtenerApuntes,actualizarApunte,eliminarApunte};
