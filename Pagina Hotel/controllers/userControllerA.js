const mysql = require('mysql2');
const userModel = require('../models/userModel');

// Iniciar sesión
const loginUser = (req, res) => {
  const { username, password } = req.body;

  userModel.authenticateUser(username, password, (error, user) => {
    if (error) return res.status(500).json({ error: 'Error de servidor' });
    if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });

    req.session.userId = user.id;
    req.session.nombre = user.username;
    res.json({ message: 'Inicio de sesión exitoso, continúe por favor'});
  });
};

// Cerrar sesión
const logoutUser = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Sesión cerrada' });
};

module.exports = {
  loginUser,
  logoutUser
};

