const express = require("express");
const router = express.Router();

const {
    obtenerProductos
} = require("../controllers/productoController");

// GET /api/productos
router.get("/", obtenerProductos);

module.exports = router;