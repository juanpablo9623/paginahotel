const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia esto por tu contraseña de MySQL
  database: 'reservas_hotel',
   multipleStatements: 'true'
});

// Función para registrar un usuario con contraseña encriptada
const registerUser = (nombre, cedula, username, password, email, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return callback(err);

    connection.query(
      'INSERT INTO users (nombre, cedula, username, password, email) VALUES (?, ?, ?, ?, ?)',
      [nombre, cedula, username, hash, email],
      (error, result) => {
        if (error) {
          return callback(error);
        }
        callback(null, result);
      }
    );
  });
};


// Función para verificar usuario y contraseña
const authenticateUser = (username, password, callback) => {
  connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) return callback(error, null);
    if (results.length === 0) return callback(null, null);

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return callback(err, null);
      if (isMatch) {
        callback(null, { id: user.id, username: user.username });
      } else {
        callback(null, null);
      }
    });
  });
};


module.exports = {
  registerUser,
  authenticateUser
};
