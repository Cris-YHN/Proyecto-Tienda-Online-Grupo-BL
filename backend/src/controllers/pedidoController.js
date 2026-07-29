const pedidoModel = require("../models/pedidoModel");

async function crearPedido(req, res) {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ mensaje: "El pedido no tiene productos." });
        }

        const id_usuario = req.usuario.id_usuario;

        const resultado = await pedidoModel.crearPedido(id_usuario, items);

        res.status(201).json(resultado);
    } catch (error) {
        console.error("Error al crear pedido:", error);
        res.status(400).json({
            mensaje: error.message || "No se pudo registrar el pedido."
        });
    }
}

module.exports = {
    crearPedido
};