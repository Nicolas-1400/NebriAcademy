const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Incidencias = require('../models/Incidencias');

const jsonPath = path.join(__dirname, '..', 'test-jsons', 'incidencias.json');
function readSample(){return JSON.parse(fs.readFileSync(jsonPath,'utf8'));}

async function createIncidencia(data){const c=await Incidencias.create(data);console.log('createIncidencia:',c.toJSON());return c}
async function getIncidencias(){const rows=await Incidencias.findAll();console.log('getIncidencias count=',rows.length);return rows.map(r=>r.toJSON())}
async function updateIncidencia(id,changes){const inst=await Incidencias.findByPk(id);if(!inst)return null;Object.keys(changes).forEach(k=>inst.set(k,changes[k]));await inst.save();console.log('updateIncidencia:',inst.toJSON());return inst}
async function deleteIncidencia(id){const inst=await Incidencias.findByPk(id);if(!inst)return false;await inst.destroy();console.log('deleteIncidencia id=',id);return true}

async function demo(){try{await sequelize.sync();console.log('Demo Incidencias');await getIncidencias();const sample=readSample();const c=await createIncidencia(sample);await getIncidencias();await updateIncidencia(c.id||c[Incidencias.primaryKeyAttribute],{tipo:(sample.tipo||'')+' - demo'});await deleteIncidencia(c.id||c[Incidencias.primaryKeyAttribute]);await sequelize.close();console.log('Demo Incidencias done')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demo();

module.exports={createIncidencia,getIncidencias,updateIncidencia,deleteIncidencia};
