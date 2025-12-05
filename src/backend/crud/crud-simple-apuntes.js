const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Apuntes = require('../models/Apuntes');

const jsonPath = path.join(__dirname, '..', 'test-jsons', 'apuntes.json');
function readSample(){return JSON.parse(fs.readFileSync(jsonPath,'utf8'));}

async function createApunte(data){const c=await Apuntes.create(data);console.log('createApunte:',c.toJSON());return c}
async function getApuntes(){const rows=await Apuntes.findAll();console.log('getApuntes count=',rows.length);return rows.map(r=>r.toJSON())}
async function updateApunte(id,changes){const inst=await Apuntes.findByPk(id);if(!inst)return null;Object.keys(changes).forEach(k=>inst.set(k,changes[k]));await inst.save();console.log('updateApunte:',inst.toJSON());return inst}
async function deleteApunte(id){const inst=await Apuntes.findByPk(id);if(!inst)return false;await inst.destroy();console.log('deleteApunte id=',id);return true}

async function demo(){try{await sequelize.sync();console.log('Demo Apuntes');await getApuntes();const sample=readSample();const c=await createApunte(sample);await getApuntes();await updateApunte(c.id||c[Apuntes.primaryKeyAttribute],{contenido:(sample.contenido||'')+' - demo'});await deleteApunte(c.id||c[Apuntes.primaryKeyAttribute]);await sequelize.close();console.log('Demo Apuntes done')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demo();

module.exports={createApunte,getApuntes,updateApunte,deleteApunte};
