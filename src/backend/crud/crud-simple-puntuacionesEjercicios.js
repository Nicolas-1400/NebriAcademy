const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const PuntuacionesEjercicios = require('../models/PuntuacionesEjercicios');

const jsonPath = path.join(__dirname, '..', 'test-jsons', 'puntuacionesEjercicios.json');
function readSample(){return JSON.parse(fs.readFileSync(jsonPath,'utf8'));}

async function createPuntuacionEjercicio(data){const c=await PuntuacionesEjercicios.create(data);console.log('createPuntuacionEjercicio:',c.toJSON());return c}
async function getPuntuacionesEjercicios(){const rows=await PuntuacionesEjercicios.findAll();console.log('count=',rows.length);return rows.map(r=>r.toJSON())}
async function updatePuntuacionEjercicio(id,changes){const inst=await PuntuacionesEjercicios.findByPk(id);if(!inst)return null;Object.keys(changes).forEach(k=>inst.set(k,changes[k]));await inst.save();console.log('update:',inst.toJSON());return inst}
async function deletePuntuacionEjercicio(id){const inst=await PuntuacionesEjercicios.findByPk(id);if(!inst)return false;await inst.destroy();console.log('delete id=',id);return true}

async function demo(){try{await sequelize.sync();console.log('Demo PuntuacionesEjercicios');await getPuntuacionesEjercicios();const sample=readSample();const c=await createPuntuacionEjercicio(sample);await getPuntuacionesEjercicios();await updatePuntuacionEjercicio(c.id||c[PuntuacionesEjercicios.primaryKeyAttribute],{puntuacion:(sample.puntuacion||0)+1});await deletePuntuacionEjercicio(c.id||c[PuntuacionesEjercicios.primaryKeyAttribute]);await sequelize.close();console.log('Demo done')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demo();

module.exports={createPuntuacionEjercicio,getPuntuacionesEjercicios,updatePuntuacionEjercicio,deletePuntuacionEjercicio};
