const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Profesores = require('../models/Profesores');

const jsonPath = path.join(__dirname, '..', 'test-jsons', 'profesores.json');
function readSample(){return JSON.parse(fs.readFileSync(jsonPath,'utf8'));}

async function createProfesor(data){const c=await Profesores.create(data);console.log('createProfesor:',c.toJSON());return c}
async function getProfesores(){const rows=await Profesores.findAll();console.log('getProfesores count=',rows.length);return rows.map(r=>r.toJSON())}
async function updateProfesor(id,changes){const inst=await Profesores.findByPk(id);if(!inst)return null;Object.keys(changes).forEach(k=>inst.set(k,changes[k]));await inst.save();console.log('updateProfesor:',inst.toJSON());return inst}
async function deleteProfesor(id){const inst=await Profesores.findByPk(id);if(!inst)return false;await inst.destroy();console.log('deleteProfesor id=',id);return true}

async function demo(){try{await sequelize.sync();console.log('Demo Profesores');await getProfesores();const sample=readSample();const c=await createProfesor(sample);await getProfesores();await updateProfesor(c.id||c[Profesores.primaryKeyAttribute],{nombre:(sample.nombre||'')+' - demo'});await deleteProfesor(c.id||c[Profesores.primaryKeyAttribute]);await sequelize.close();console.log('Demo Profesores done')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demo();

module.exports={createProfesor,getProfesores,updateProfesor,deleteProfesor};
