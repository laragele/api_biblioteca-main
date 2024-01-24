// /routes/usuarios.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarioController');
const { requiredScopes } = require("express-oauth2-jwt-bearer");



router.get('/', requiredScopes("read:usuarios"),usuariosController.obtenerUsuarios);
router.get('/:id', requiredScopes("read:usuarios"),usuariosController.obtenerUsuarioPorId);
router.post('/', requiredScopes("write:usuarios"), usuariosController.crearUsuario);
router.put('/:id', requiredScopes("write:usuarios"), usuariosController.actualizarUsuario);
router.delete('/:id',requiredScopes("write:usuarios"),  usuariosController.eliminarUsuario);

module.exports = router;
