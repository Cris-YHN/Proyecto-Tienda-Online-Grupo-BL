const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "cambiar_este_secreto";

// Se usa en rutas que necesitan saber "quién" hace el pedido (ej. POST /api/pedidos).
// Espera el header: Authorization: Bearer <token>
function verificarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ mensaje: "No se envió token de autenticación." });
    }

    jwt.verify(token, JWT_SECRET, (error, payload) => {
        if (error) {
            return res.status(403).json({ mensaje: "Token inválido o vencido." });
        }
        req.usuario = payload; // { id_usuario, email }
        next();
    });
}

module.exports = verificarToken;
