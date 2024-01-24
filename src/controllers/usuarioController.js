// /controllers/usuariosController.js
const Usuario = require('../models/usuarioModel');

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

const crearUsuario = async (req, res) => {
  const { nombre, email } = req.body;

  try {
    const nuevoUsuario = new Usuario({ nombre, email });
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario' });
  }
};

const actualizarUsuario = async (req, res) => {
  const usuarioId = req.params.id;
  const { nombre, email } = req.body;

  try {
    const usuario = await Usuario.findByIdAndUpdate(
      usuarioId,
      { nombre, email },
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const eliminarUsuario = async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const usuarioEliminado = await Usuario.findByIdAndRemove(usuarioId);

    if (!usuarioEliminado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};
