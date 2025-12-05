const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Ejercicios = require('../models/Ejercicios');

const jsonPath = path.join(__dirname, '..', 'test-jsons', 'ejercicios.json');
function readSample(){return JSON.parse(fs.readFileSync(jsonPath,'utf8'));}

async function createEjercicio(data){const c=await Ejercicios.create(data);console.log('createEjercicio:',c.toJSON());return c}
async function getEjercicios(){const rows=await Ejercicios.findAll();console.log('getEjercicios count=',rows.length);return rows.map(r=>r.toJSON())}
async function updateEjercicio(id,changes){const inst=await Ejercicios.findByPk(id);if(!inst)return null;Object.keys(changes).forEach(k=>inst.set(k,changes[k]));await inst.save();console.log('updateEjercicio:',inst.toJSON());return inst}
async function deleteEjercicio(id){const inst=await Ejercicios.findByPk(id);if(!inst)return false;await inst.destroy();console.log('deleteEjercicio id=',id);return true}

async function demo(){try{await sequelize.sync();console.log('Demo Ejercicios');await getEjercicios();const sample=readSample();const c=await createEjercicio(sample);await getEjercicios();await updateEjercicio(c.id||c[Ejercicios.primaryKeyAttribute],{valoracion:(sample.valoracion||0)+1});await deleteEjercicio(c.id||c[Ejercicios.primaryKeyAttribute]);await sequelize.close();console.log('Demo Ejercicios done')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demo();

module.exports={createEjercicio,getEjercicios,updateEjercicio,deleteEjercicio};
