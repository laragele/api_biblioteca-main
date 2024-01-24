const express = require("express");

const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middlewares/errorHandler");
const conectarBaseDeDatos = require('./config/database');
const usuariosRoutes = require('./routes/usuarios');

conectarBaseDeDatos();
require('dotenv').config();


// Configuracion Middleware con el Servidor de Autorización 
const autenticacion = auth({
  audience: 'https://localhost:3000/libros',
  issuerBaseURL: 'https://dev-wluh5u5v7de7oyr2.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});


const app = express();
app.use(express.json());


const librosRouter = require("./routes/libros");


//Configuramos el middleware de autenticacion
app.use("/api/libros", autenticacion,  librosRouter);
app.use('/usuarios', autenticacion, usuariosRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});

module.exports = app;

// CURL PARA OBTENER EL TOKEN
// curl --request POST \
//   --url https://dev-wluh5u5v7de7oyr2.us.auth0.com/oauth/token \
//   --header 'content-type: application/json' \
 // --data '{"client_id":"rxiGfrCwrEhtTbgouwrTf2CJ6YCIv69X","client_secret":"vnouV8VX0PpmMuXqv2I8zz_cdlwNKl_5itVVLUrnliy43L2PXtyEJTKeZMMltYJa","audience":"https://localhost:3000/libros","grant_type":"client_credentials"}'