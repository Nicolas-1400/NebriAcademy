const fs = require('fs');
const path = require('path');
const http = require('http');

const BASE_URL = 'http://localhost:3000';

const endpoints = [
  { path: '/usuarios', file: 'usuarios.json' },
  { path: '/administradores', file: 'administradores.json' },
  { path: '/alumnos', file: 'alumnos.json' },
  { path: '/profesores', file: 'profesores.json' },
  { path: '/cursos', file: 'cursos.json' },
  { path: '/profesores-cursos', file: 'profesoresCursos.json' },
  { path: '/cursos-alumnos', file: 'cursosAlumnos.json' },
  { path: '/apuntes', file: 'apuntes.json' },
  { path: '/incidencias', file: 'incidencias.json' },
  { path: '/ejercicios', file: 'ejercicios.json' },
  { path: '/puntuaciones-ejercicios', file: 'puntuacionesEjercicios.json' },
  { path: '/videos', file: 'videos.json' }
];

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname,
      method,
      headers: { 'Content-Type': 'application/json' }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function loadJSON(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'test-jsons', file), 'utf8'));
}

async function testEndpoint(endpoint, file) {
  const data = loadJSON(file);
  const results = [];

  try {
    // GET ALL
    const getAll = await request('GET', endpoint);
    results.push(`GET   ${endpoint.padEnd(25)} → ${getAll.status}`);

    // POST (crear)
    const post = await request('POST', endpoint, data);
    results.push(`POST  ${endpoint.padEnd(25)} → ${post.status}${post.status === 201 ? ' ✓' : ''}`);
    
    let createdId = null;
    if (post.status === 201 && post.body.data && post.body.data.id) {
      createdId = post.body.data.id;

      // GET BY ID
      const getById = await request('GET', `${endpoint}/${createdId}`);
      results.push(`GET   ${endpoint}/${createdId}`.padEnd(35) + ` → ${getById.status}`);

      // PUT
      const updateData = { ...data };
      const firstKey = Object.keys(updateData)[0];
      if (typeof updateData[firstKey] === 'string') {
        updateData[firstKey] += ' [UPD]';
      }
      const put = await request('PUT', `${endpoint}/${createdId}`, updateData);
      results.push(`PUT   ${endpoint}/${createdId}`.padEnd(35) + ` → ${put.status}`);

      // DELETE
      const del = await request('DELETE', `${endpoint}/${createdId}`);
      results.push(`DELETE ${endpoint}/${createdId}`.padEnd(35) + ` → ${del.status}`);
    }
  } catch (err) {
    results.push(`ERROR ${endpoint.padEnd(25)} → ${err.message}`);
  }

  return results;
}

async function runTests() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║              PRUEBAS CRUD - NebriAcademy Backend              ║');
  console.log('║              http://localhost:3000                            ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  for (const ep of endpoints) {
    const results = await testEndpoint(ep.path, ep.file);
    results.forEach(r => console.log(r));
    console.log('');
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log('✅ Pruebas completadas\n');
}

runTests().catch(console.error);
