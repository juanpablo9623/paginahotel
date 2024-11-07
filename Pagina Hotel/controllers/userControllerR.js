const userModel = require('../models/userModel');

// Registrar un nuevo usuario
const registerUser = (req, res) => {
  const { nombre, cedula, username, password, email } = req.body;

  userModel.registerUser(nombre, cedula, username, password, email, (error, result) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'El nombre de usuario ya existe' });
      }
      return res.status(500).json({ error: 'Error de servidor' });
    }
    res.json({ message: 'Usuario registrado correctamente' });
  });
};

module.exports = {
  registerUser
};
