const { Sequelize } = require('sequelize');

// Configuración de conexión a la base de datos MySQL
const sequelize = new Sequelize(
    'nebriacademy', 
    'root',  
    '', 
    {
      host: 'localhost',
      dialect: 'mysql'
    });

// Verifica la conexión a la base de datos
sequelize.authenticate().then(() => {
    console.log('Conexión establecida correctamente.');

}).catch((error) => {
    console.error('No se pudo conectar a la base de datos.', error);
});

module.exports = sequelize;