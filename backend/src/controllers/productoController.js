const productoModel = require("../models/productoModel");

async function obtenerProductos(req, res) {
    try {
        const productos = await productoModel.obtenerProductos();

        res.json(productos);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los productos"
        });
    }
}

async function obtenerProductoPorId(req, res) {

    try {

        const id = req.params.id;

        const producto = await productoModel.obtenerProductoPorId(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener el producto"
        });

    }

}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId
};