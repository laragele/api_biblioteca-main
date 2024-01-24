const mongoose = require('mongoose');

const conectarBaseDeDatos = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mi-api-usuarios');
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error en la conexión a MongoDB:', error);
  }
};

module.exports = conectarBaseDeDatos;
