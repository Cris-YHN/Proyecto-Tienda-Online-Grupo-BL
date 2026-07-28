const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/usuarioModel");

const JWT_SECRET = process.env.JWT_SECRET || "cambiar_este_secreto";

async function registrar(req, res) {
    try {
        const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;

        if (!nombre || !apellido || !email || !contraseña) {
            return res.status(400).json({
                mensaje: "Faltan datos obligatorios (nombre, apellido, email, contraseña)."
            });
        }

        const existente = await usuarioModel.obtenerPorEmail(email);
        if (existente) {
            return res.status(409).json({ mensaje: "Ya existe una cuenta con ese email." });
        }

        const claveHash = await bcrypt.hash(contraseña, 10);
        const usuario = await usuarioModel.crearUsuario({
            nombre, apellido, email, telefono, direccion, claveHash
        });

        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, email: usuario.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email
            },
            token
        });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ mensaje: "Error al registrar el usuario." });
    }
}

async function login(req, res) {
    try {
        const { email, contraseña } = req.body;

        if (!email || !contraseña) {
            return res.status(400).json({ mensaje: "Ingresá email y contraseña." });
        }

        const usuario = await usuarioModel.obtenerPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ mensaje: "Email o contraseña incorrectos." });
        }

        const coincide = await bcrypt.compare(contraseña, usuario["contraseña"]);
        if (!coincide) {
            return res.status(401).json({ mensaje: "Email o contraseña incorrectos." });
        }

        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, email: usuario.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email
            },
            token
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: "Error al iniciar sesión." });
    }
}

module.exports = {
    registrar,
    login
};