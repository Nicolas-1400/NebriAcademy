const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Alumnos = require('../models/Alumnos');

const jsonPath = path.join(__dirname, '..', 'test-jsons', 'alumnos.json');

function readSample() { return JSON.parse(fs.readFileSync(jsonPath, 'utf8')); }

async function createAlumno(data) { const c = await Alumnos.create(data); console.log('createAlumno:', c.toJSON()); return c; }
async function getAlumnos() { const rows = await Alumnos.findAll(); console.log('getAlumnos count=', rows.length); return rows.map(r=>r.toJSON()); }
async function updateAlumno(id, changes) { const inst = await Alumnos.findByPk(id); if(!inst) return null; Object.keys(changes).forEach(k=>inst.set(k,changes[k])); await inst.save(); console.log('updateAlumno:', inst.toJSON()); return inst; }
async function deleteAlumno(id) { const inst = await Alumnos.findByPk(id); if(!inst) return false; await inst.destroy(); console.log('deleteAlumno id=',id); return true; }

async function demo() {
  try {
    await sequelize.sync();
    console.log('Demo Alumnos');
    await getAlumnos();
    const sample = readSample();
    const c = await createAlumno(sample);
    await getAlumnos();
    await updateAlumno(c.id || c[Alumnos.primaryKeyAttribute], { nombre: (sample.nombre||'') + ' - demo' });
    await deleteAlumno(c.id || c[Alumnos.primaryKeyAttribute]);
    await sequelize.close();
    console.log('Demo Alumnos done');
  } catch (err) { console.error(err.message||err); try{await sequelize.close();}catch(e){} process.exit(1);} 
}

if(require.main===module) demo();

module.exports = { createAlumno, getAlumnos, updateAlumno, deleteAlumno };
