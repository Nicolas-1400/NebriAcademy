const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    'nebriacademy', 
    'root',  
    '', 
    {
      host: 'localhost',
      dialect: 'mysql'
    });

sequelize.authenticate().then(() => {
    console.log('Conexión establecida correctamente.');

}).catch((error) => {
    console.error('No se pudo conectar a la base de datos.', error);
});