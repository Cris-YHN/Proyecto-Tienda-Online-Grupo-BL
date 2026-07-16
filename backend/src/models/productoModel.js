const { conectarDB } = require("../config/db");

async function obtenerProductos() {
    try {
        const pool = await conectarDB();

        const resultado = await pool.request().query(`
            SELECT *
            FROM Productos
        `);

        return resultado.recordset;
    } catch (error) {
        throw error;
    }
}

async function obtenerProductoPorId(id) {
    try {
        const pool = await conectarDB();

        const resultado = await pool
            .request()
            .input("id", id)
            .query(`
                SELECT *
                FROM Productos
                WHERE id_producto = @id
            `);

        return resultado.recordset[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId
};