const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const CursosAlumnos = require('../models/CursosAlumnos');

const jsonPath = path.join(__dirname, '..', 'test-jsons', 'cursosAlumnos.json');
function readSample(){return JSON.parse(fs.readFileSync(jsonPath,'utf8'));}

async function createCursoAlumno(data){const c=await CursosAlumnos.create(data);console.log('createCursoAlumno:',c.toJSON());return c}
async function getCursosAlumnos(){const rows=await CursosAlumnos.findAll();console.log('getCursosAlumnos count=',rows.length);return rows.map(r=>r.toJSON())}
async function updateCursoAlumno(id,changes){const inst=await CursosAlumnos.findByPk(id);if(!inst)return null;Object.keys(changes).forEach(k=>inst.set(k,changes[k]));await inst.save();console.log('updateCursoAlumno:',inst.toJSON());return inst}
async function deleteCursoAlumno(id){const inst=await CursosAlumnos.findByPk(id);if(!inst)return false;await inst.destroy();console.log('deleteCursoAlumno id=',id);return true}

async function demo(){try{await sequelize.sync();console.log('Demo CursosAlumnos');await getCursosAlumnos();const sample=readSample();const c=await createCursoAlumno(sample);await getCursosAlumnos();await updateCursoAlumno(c.id||c[CursosAlumnos.primaryKeyAttribute],{cursoId:sample.cursoId});await deleteCursoAlumno(c.id||c[CursosAlumnos.primaryKeyAttribute]);await sequelize.close();console.log('Demo CursosAlumnos done')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demo();

module.exports={createCursoAlumno,getCursosAlumnos,updateCursoAlumno,deleteCursoAlumno};
