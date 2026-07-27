require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const { conectarDB } = require("./src/config/db");
const app = express();

// Importar rutas
const productoRoutes = require("./src/routes/productoRoutes");
const usuarioRoutes = require("./src/routes/usuarioRoutes");
const pedidoRoutes = require("./src/routes/pedidoRoutes");

// Middlewares
app.use(cors());
app.use(express.json());

// Sirve el frontend (index.html, categorias.html, contacto.html, assets/...)
// Con esto, http://localhost:3000 ya muestra la página directamente.
app.use(express.static(path.join(__dirname, "../frontend")));

// Ruta de prueba de la API (antes vivía en "/", pero ahí ahora se sirve el frontend)
app.get("/api/ping", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

// Rutas de la API
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/pedidos", pedidoRoutes);

const PORT = process.env.PORT || 3000;

conectarDB();

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});