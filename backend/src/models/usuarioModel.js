const { conectarDB } = require("../config/db");

async function obtenerPorEmail(email) {
    try {
        const pool = await conectarDB();

        const resultado = await pool
            .request()
            .input("email", email)
            .query("SELECT * FROM Usuarios WHERE email = @email");

        return resultado.recordset[0];
    } catch (error) {
        throw error;
    }
}

async function crearUsuario({ nombre, apellido, email, telefono, direccion, claveHash }) {
    try {
        const pool = await conectarDB();

        const resultado = await pool
            .request()
            .input("nombre", nombre)
            .input("apellido", apellido)
            .input("email", email)
            .input("telefono", telefono || null)
            .input("direccion", direccion || null)
            .input("clave", claveHash)
            .query(`
                INSERT INTO Usuarios (nombre, apellido, email, telefono, direccion, contraseña)
                OUTPUT INSERTED.id_usuario, INSERTED.nombre, INSERTED.apellido, INSERTED.email
                VALUES (@nombre, @apellido, @email, @telefono, @direccion, @clave)
            `);

        return resultado.recordset[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    obtenerPorEmail,
    crearUsuario
};