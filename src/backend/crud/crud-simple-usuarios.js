const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Usuarios = require('../models/Usuarios');

const rutaJson = path.join(__dirname, '..', 'test-jsons', 'usuarios.json');

// Lee el archivo JSON de ejemplo
function leerMuestra() {
  const contenido = fs.readFileSync(rutaJson, 'utf8');
  return JSON.parse(contenido);
}

// Crea un nuevo usuario
async function crearUsuario(datos) {
  try {
    const creado = await Usuarios.create(datos);
    console.log('crearUsuario: creado ->', creado.toJSON());
    return creado;
  } catch (err) {
    console.error('crearUsuario: error ->', err.message || err);
    throw err;
  }
}

// Obtiene todos los usuarios
async function obtenerUsuarios() {
  const filas = await Usuarios.findAll();
  const lista = filas.map(f => f.toJSON());
  console.log('obtenerUsuarios: encontrado', lista.length, 'registros');
  return lista;
}

// Actualiza un usuario por id
async function actualizarUsuario(id, cambios) {
  const instancia = await Usuarios.findByPk(id);
  if (!instancia) {
    console.warn('actualizarUsuario: usuario no encontrado id=', id);
    return null;
  }
  Object.keys(cambios).forEach(k => instancia.set(k, cambios[k]));
  await instancia.save();
  console.log('actualizarUsuario: actualizado ->', instancia.toJSON());
  return instancia;
}

// Elimina un usuario por id
async function eliminarUsuario(id) {
  const instancia = await Usuarios.findByPk(id);
  if (!instancia) {
    console.warn('eliminarUsuario: usuario no encontrado id=', id);
    return false;
  }
  await instancia.destroy();
  console.log('eliminarUsuario: eliminado id=', id);
  return true;
}

// Demo de uso
async function demostración() {
  try {
    await sequelize.sync();
    console.log('DB sincronizada. Inicio demostración CRUD simple sobre Usuarios.');

    await obtenerUsuarios();
    const muestra = leerMuestra();
    const creado = await crearUsuario(muestra);
    await obtenerUsuarios();
    const id = creado.id || creado[Usuarios.primaryKeyAttribute];
    const paraActualizar = {};
    if (muestra.tipo) paraActualizar.tipo = muestra.tipo + ' - demostración';
    await actualizarUsuario(id, paraActualizar);
    await eliminarUsuario(id);
    await obtenerUsuarios();

    await sequelize.close();
    console.log('Demostración completada. Conexión cerrada.');
  } catch (err) {
    console.error('Demostración falló:', err.message || err);
    try { await sequelize.close(); } catch (e) {}
    process.exit(1);
  }
}

if (require.main === module) {
  demostración();
}

module.exports = { crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario };
