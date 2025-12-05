const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Usuarios = require('../models/Usuarios');

const jsonPath = path.join(__dirname, '..', 'test-jsons', 'usuarios.json');

function readSample() {
  const raw = fs.readFileSync(jsonPath, 'utf8');
  return JSON.parse(raw);
}

// CREATE: añade un nuevo usuario (devuelve instancia creada)
async function createUser(data) {
  try {
    const created = await Usuarios.create(data);
    console.log('createUser: creado ->', created.toJSON());
    return created;
  } catch (err) {
    console.error('createUser: error ->', err.message || err);
    throw err;
  }
}

// READ: devuelve todos los usuarios
async function getUsers() {
  const rows = await Usuarios.findAll();
  const list = rows.map(r => r.toJSON());
  console.log('getUsers: encontrado', list.length, 'registros');
  return list;
}

// UPDATE: actualiza un usuario por id con un objeto de cambios
async function updateUser(id, changes) {
  const instance = await Usuarios.findByPk(id);
  if (!instance) {
    console.warn('updateUser: usuario no encontrado id=', id);
    return null;
  }
  Object.keys(changes).forEach(k => instance.set(k, changes[k]));
  await instance.save();
  console.log('updateUser: actualizado ->', instance.toJSON());
  return instance;
}

// DELETE: elimina un usuario por id
async function deleteUser(id) {
  const instance = await Usuarios.findByPk(id);
  if (!instance) {
    console.warn('deleteUser: usuario no encontrado id=', id);
    return false;
  }
  await instance.destroy();
  console.log('deleteUser: eliminado id=', id);
  return true;
}

// Demo de uso similar al ejemplo solicitado
async function demo() {
  try {
    await sequelize.sync();
    console.log('DB sincronizada. Inicio demo CRUD simple sobre Usuarios.');

    // READ inicial
    await getUsers();

    // CREATE usando el JSON de ejemplo
    const sample = readSample();
    const created = await createUser(sample);

    // READ para ver el nuevo registro
    await getUsers();

    // UPDATE: si tiene algún campo string lo concatenamos como ejemplo
    const id = created.id || created[Usuarios.primaryKeyAttribute];
    const toUpdate = {};
    if (sample.tipo) toUpdate.tipo = sample.tipo + ' - demo';
    await updateUser(id, toUpdate);

    // DELETE
    await deleteUser(id);

    // READ final
    await getUsers();

    await sequelize.close();
    console.log('Demo completada. Conexión cerrada.');
  } catch (err) {
    console.error('Demo falló:', err.message || err);
    try { await sequelize.close(); } catch (e) {}
    process.exit(1);
  }
}

if (require.main === module) {
  demo();
}

module.exports = { createUser, getUsers, updateUser, deleteUser };
