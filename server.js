const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "Welcome !!!!" });
});
const usuarioRoutes = require('./src/routes/actividadRoutes');
app.use('/api/actividades', usuarioRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🖥 Servidor corriendo en http://localhost:${PORT} 👾`);
});