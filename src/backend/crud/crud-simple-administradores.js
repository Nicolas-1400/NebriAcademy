const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Administradores = require('../models/Administradores');

const rutaJson = path.join(__dirname, '..', 'test-jsons', 'administradores.json');

// Lee el archivo JSON de ejemplo
function leerMuestra() {
  const contenido = fs.readFileSync(rutaJson, 'utf8');
  return JSON.parse(contenido);
}

// Crea un nuevo administrador
async function crearAdministrador(datos) {
  const creado = await Administradores.create(datos);
  console.log('crearAdministrador:', creado.toJSON());
  return creado;
}

// Obtiene todos los administradores
async function obtenerAdministradores() {
  const filas = await Administradores.findAll();
  console.log('obtenerAdministradores: count=', filas.length);
  return filas.map(f => f.toJSON());
}

// Actualiza un administrador por id
async function actualizarAdministrador(id, cambios) {
  const inst = await Administradores.findByPk(id);
  if (!inst) return null;
  Object.keys(cambios).forEach(k => inst.set(k, cambios[k]));
  await inst.save();
  console.log('actualizarAdministrador:', inst.toJSON());
  return inst;
}

// Elimina un administrador por id
async function eliminarAdministrador(id) {
  const inst = await Administradores.findByPk(id);
  if (!inst) return false;
  await inst.destroy();
  console.log('eliminarAdministrador id=', id);
  return true;
}

// Demo de uso
async function demostración() {
  try {
    await sequelize.sync();
    console.log('Demostración Administradores');
    await obtenerAdministradores();
    const muestra = leerMuestra();
    const creado = await crearAdministrador(muestra);
    await obtenerAdministradores();
    await actualizarAdministrador(creado.id || creado[Administradores.primaryKeyAttribute], { nombre: (muestra.nombre || '') + ' - demostración' });
    await eliminarAdministrador(creado.id || creado[Administradores.primaryKeyAttribute]);
    await sequelize.close();
    console.log('Demostración Administradores completada');
  } catch (err) {
    console.error(err.message || err);
    try { await sequelize.close(); } catch (e) {}
    process.exit(1);
  }
}

if (require.main === module) {
  demostración();
}

module.exports = { crearAdministrador, obtenerAdministradores, actualizarAdministrador, eliminarAdministrador };
