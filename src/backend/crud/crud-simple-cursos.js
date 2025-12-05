const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Cursos = require('../models/Cursos');

const jsonPath = path.join(__dirname, '..', 'test-jsons', 'cursos.json');
function readSample(){return JSON.parse(fs.readFileSync(jsonPath,'utf8'));}

async function createCurso(data){const c=await Cursos.create(data);console.log('createCurso:',c.toJSON());return c}
async function getCursos(){const rows=await Cursos.findAll();console.log('getCursos count=',rows.length);return rows.map(r=>r.toJSON())}
async function updateCurso(id,changes){const inst=await Cursos.findByPk(id);if(!inst)return null;Object.keys(changes).forEach(k=>inst.set(k,changes[k]));await inst.save();console.log('updateCurso:',inst.toJSON());return inst}
async function deleteCurso(id){const inst=await Cursos.findByPk(id);if(!inst)return false;await inst.destroy();console.log('deleteCurso id=',id);return true}

async function demo(){try{await sequelize.sync();console.log('Demo Cursos');await getCursos();const sample=readSample();const c=await createCurso(sample);await getCursos();await updateCurso(c.id||c[Cursos.primaryKeyAttribute],{nombreCurso:(sample.nombreCurso||'')+' - demo'});await deleteCurso(c.id||c[Cursos.primaryKeyAttribute]);await sequelize.close();console.log('Demo Cursos done')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demo();

module.exports={createCurso,getCursos,updateCurso,deleteCurso};
