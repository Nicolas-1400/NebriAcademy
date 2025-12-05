const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Administradores = require('../models/Administradores');

const jsonPath = path.join(__dirname, '..', 'test-jsons', 'administradores.json');

function readSample() {
  const raw = fs.readFileSync(jsonPath, 'utf8');
  return JSON.parse(raw);
}

async function createAdministrador(data) {
  const created = await Administradores.create(data);
  console.log('createAdministrador:', created.toJSON());
  return created;
}

async function getAdministradores() {
  const rows = await Administradores.findAll();
  console.log('getAdministradores: count=', rows.length);
  return rows.map(r => r.toJSON());
}

async function updateAdministrador(id, changes) {
  const inst = await Administradores.findByPk(id);
  if (!inst) return null;
  Object.keys(changes).forEach(k => inst.set(k, changes[k]));
  await inst.save();
  console.log('updateAdministrador:', inst.toJSON());
  return inst;
}

async function deleteAdministrador(id) {
  const inst = await Administradores.findByPk(id);
  if (!inst) return false;
  await inst.destroy();
  console.log('deleteAdministrador id=', id);
  return true;
}

async function demo() {
  try {
    await sequelize.sync();
    console.log('Demo Administradores');
    await getAdministradores();
    const sample = readSample();
    const c = await createAdministrador(sample);
    await getAdministradores();
    await updateAdministrador(c.id || c[Administradores.primaryKeyAttribute], { nombre: (sample.nombre || '') + ' - demo' });
    await deleteAdministrador(c.id || c[Administradores.primaryKeyAttribute]);
    await sequelize.close();
    console.log('Demo Administradores done');
  } catch (err) {
    console.error(err.message || err);
    try { await sequelize.close(); } catch (e) {}
    process.exit(1);
  }
}

if (require.main === module) demo();

module.exports = { createAdministrador, getAdministradores, updateAdministrador, deleteAdministrador };
