const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const userRoutesR = require('./routes/userRoutesR');
const userRoutesA = require('./routes/userRoutesA');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true
}));

// Rutas
app.use('/users', userRoutesR);
app.use('/users', userRoutesA);

// Iniciar el servidor
const PORT = 3007;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////