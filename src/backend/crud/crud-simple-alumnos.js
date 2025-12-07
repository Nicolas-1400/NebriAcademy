const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Alumnos = require('../models/Alumnos');

const rutaJson = path.join(__dirname, '..', 'test-jsons', 'alumnos.json');

// Lee el archivo JSON de ejemplo
function leerMuestra() { return JSON.parse(fs.readFileSync(rutaJson, 'utf8')); }

// Crea un nuevo alumno
async function crearAlumno(datos) { const creado = await Alumnos.create(datos); console.log('crearAlumno:', creado.toJSON()); return creado; }
// Obtiene todos los alumnos
async function obtenerAlumnos() { const filas = await Alumnos.findAll(); console.log('obtenerAlumnos count=', filas.length); return filas.map(f=>f.toJSON()); }
// Actualiza un alumno por id
async function actualizarAlumno(id, cambios) { const inst = await Alumnos.findByPk(id); if(!inst) return null; Object.keys(cambios).forEach(k=>inst.set(k,cambios[k])); await inst.save(); console.log('actualizarAlumno:', inst.toJSON()); return inst; }
// Elimina un alumno por id
async function eliminarAlumno(id) { const inst = await Alumnos.findByPk(id); if(!inst) return false; await inst.destroy(); console.log('eliminarAlumno id=',id); return true; }

// Demo de uso
async function demostración() {
  try {
    await sequelize.sync();
    console.log('Demostración Alumnos');
    await obtenerAlumnos();
    const muestra = leerMuestra();
    const creado = await crearAlumno(muestra);
    await obtenerAlumnos();
    await actualizarAlumno(creado.id || creado[Alumnos.primaryKeyAttribute], { nombre: (muestra.nombre||'') + ' - demostración' });
    await eliminarAlumno(creado.id || creado[Alumnos.primaryKeyAttribute]);
    await sequelize.close();
    console.log('Demostración Alumnos completada');
  } catch (err) { console.error(err.message||err); try{await sequelize.close();}catch(e){} process.exit(1);} 
}

if(require.main===module) demostración();

module.exports = { crearAlumno, obtenerAlumnos, actualizarAlumno, eliminarAlumno };
