const { conectarDB } = require("../config/db");

async function obtenerProductos() {
    try {
        const pool = await conectarDB();

        const resultado = await pool.request().query(`
            SELECT
                p.id_producto,
                p.nombre,
                p.marca,
                p.descripcion,
                p.precio,
                p.stock,
                p.imagen,
                c.nombre AS categoria
            FROM Productos p
            INNER JOIN Categorias c ON p.id_categoria = c.id_categoria
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
                SELECT 
                    p.id_producto, p.nombre, p.marca, p.descripcion, 
                    p.precio, p.stock, p.imagen, c.nombre AS categoria
                FROM Productos p
                INNER JOIN Categorias c ON p.id_categoria = c.id_categoria
                WHERE p.id_producto = @id
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