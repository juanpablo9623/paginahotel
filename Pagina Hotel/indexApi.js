const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const userRoutesR = require('./routes/userRoutesR');
const userRoutesA = require('./routes/userRoutesA');
const reservacionRoutes = require('./routes/reservacionRoutes');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

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

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:5501'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas
app.use('/users', userRoutesR);
app.use('/users', userRoutesA);
app.use('/', reservacionRoutes);


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reservas_hotel'
});

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Iniciar el servidor
const PORT = 3007;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////