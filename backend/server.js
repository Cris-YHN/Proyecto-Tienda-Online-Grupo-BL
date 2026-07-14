const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Importar rutas
const productoRoutes = require("./src/routes/productoRoutes");

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

// Rutas de la API
app.use("/api/productos", productoRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});