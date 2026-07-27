const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");
const verificarToken = require("../middlewares/verificarToken");

router.post("/", verificarToken, pedidoController.crearPedido);

module.exports = router;