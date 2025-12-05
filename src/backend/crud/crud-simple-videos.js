const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection');
const Videos = require('../models/Videos');

const jsonPath = path.join(__dirname, '..', 'test-jsons', 'videos.json');
function readSample(){return JSON.parse(fs.readFileSync(jsonPath,'utf8'));}

async function createVideo(data){const c=await Videos.create(data);console.log('createVideo:',c.toJSON());return c}
async function getVideos(){const rows=await Videos.findAll();console.log('getVideos count=',rows.length);return rows.map(r=>r.toJSON())}
async function updateVideo(id,changes){const inst=await Videos.findByPk(id);if(!inst)return null;Object.keys(changes).forEach(k=>inst.set(k,changes[k]));await inst.save();console.log('updateVideo:',inst.toJSON());return inst}
async function deleteVideo(id){const inst=await Videos.findByPk(id);if(!inst)return false;await inst.destroy();console.log('deleteVideo id=',id);return true}

async function demo(){try{await sequelize.sync();console.log('Demo Videos');await getVideos();const sample=readSample();const c=await createVideo(sample);await getVideos();await updateVideo(c.id||c[Videos.primaryKeyAttribute],{duracion:(sample.duracion||0)+1});await deleteVideo(c.id||c[Videos.primaryKeyAttribute]);await sequelize.close();console.log('Demo Videos done')}catch(err){console.error(err.message||err);try{await sequelize.close()}catch(e){}process.exit(1)}}

if(require.main===module) demo();

module.exports={createVideo,getVideos,updateVideo,deleteVideo};
