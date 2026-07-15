const productoModel = require("../models/productoModel");

// Obtener todos los productos
const obtenerProductos = (req, res) => {
    const productos = productoModel.obtenerTodos();
    res.json(productos);
};

module.exports = {
    obtenerProductos
};