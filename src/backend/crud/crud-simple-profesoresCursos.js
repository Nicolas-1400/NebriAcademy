const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const ProfesoresCursos = require('../models/ProfesoresCursos');

const jsonPath = path.join(__dirname, '..', 'test-jsons', 'profesoresCursos.json');
function readSample(){return JSON.parse(fs.readFileSync(jsonPath,'utf8'));}

async function createProfesorCurso(data){const c=await ProfesoresCursos.create(data);console.log('createProfesorCurso:',c.toJSON());return c}
async function getProfesoresCursos(){const rows=await ProfesoresCursos.findAll();console.log('getProfesoresCursos count=',rows.length);return rows.map(r=>r.toJSON())}
async function updateProfesorCurso(id,changes){const inst=await ProfesoresCursos.findByPk(id);if(!inst)return null;Object.keys(changes).forEach(k=>inst.set(k,changes[k]));await inst.save();console.log('updateProfesorCurso:',inst.toJSON());return inst}
async function deleteProfesorCurso(id){const inst=await ProfesoresCursos.findByPk(id);if(!inst)return false;await inst.destroy();console.log('deleteProfesorCurso id=',id);return true}

async function demo(){try{await sequelize.sync();console.log('Demo ProfesoresCursos');await getProfesoresCursos();const sample=readSample();const c=await createProfesorCurso(sample);await getProfesoresCursos();await updateProfesorCurso(c.id||c[ProfesoresCursos.primaryKeyAttribute],{profesorId:sample.profesorId});await deleteProfesorCurso(c.id||c[ProfesoresCursos.primaryKeyAttribute]);await sequelize.close();console.log('Demo ProfesoresCursos done')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demo();

module.exports={createProfesorCurso,getProfesoresCursos,updateProfesorCurso,deleteProfesorCurso};
