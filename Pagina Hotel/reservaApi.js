const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const reservacionRoutes = require('./routes/reservacionRoutes');
const app = express();
const PORT = 3007;

// Configuración de CORS
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:5501'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', reservacionRoutes);

// Base de datos
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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
