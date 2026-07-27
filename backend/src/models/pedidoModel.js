const { sql, conectarDB } = require("../config/db");

// Crea un pedido completo (Pedidos + DetallePedido) dentro de una transacción:
// si algo falla (producto inexistente, sin stock, etc.) no queda nada guardado
// a medias. El precio SIEMPRE se toma de la base, nunca del que manda el
// frontend, para que no se pueda "editar" el precio desde el navegador.
async function crearPedido(id_usuario, items) {
    const pool = await conectarDB();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
        let total = 0;
        const itemsConPrecio = [];

        for (const item of items) {
            const request = new sql.Request(transaction);
            const resultado = await request
                .input("id", item.id_producto)
                .query("SELECT id_producto, nombre, precio, stock FROM Productos WHERE id_producto = @id");

            const producto = resultado.recordset[0];

            if (!producto) {
                throw new Error(`El producto con id ${item.id_producto} no existe.`);
            }
            if (producto.stock < item.cantidad) {
                throw new Error(`No hay stock suficiente de "${producto.nombre}" (quedan ${producto.stock}).`);
            }

            total += producto.precio * item.cantidad;
            itemsConPrecio.push({
                id_producto: producto.id_producto,
                cantidad: item.cantidad,
                precio_unitario: producto.precio
            });
        }

        const requestPedido = new sql.Request(transaction);
        const pedidoResult = await requestPedido
            .input("total", total)
            .input("estado", "Pendiente")
            .input("id_usuario", id_usuario)
            .query(`
                INSERT INTO Pedidos (total, estado, id_usuario)
                OUTPUT INSERTED.id_pedido
                VALUES (@total, @estado, @id_usuario)
            `);

        const id_pedido = pedidoResult.recordset[0].id_pedido;

        for (const item of itemsConPrecio) {
            const requestDetalle = new sql.Request(transaction);
            await requestDetalle
                .input("id_pedido", id_pedido)
                .input("id_producto", item.id_producto)
                .input("cantidad", item.cantidad)
                .input("precio_unitario", item.precio_unitario)
                .query(`
                    INSERT INTO DetallePedido (id_pedido, id_producto, cantidad, precio_unitario)
                    VALUES (@id_pedido, @id_producto, @cantidad, @precio_unitario)
                `);

            const requestStock = new sql.Request(transaction);
            await requestStock
                .input("id_producto", item.id_producto)
                .input("cantidad", item.cantidad)
                .query("UPDATE Productos SET stock = stock - @cantidad WHERE id_producto = @id_producto");
        }

        await transaction.commit();
        return { id_pedido, total };
    } catch (error) {
        try {
            await transaction.rollback();
        } catch (rollbackError) {
            console.error("Error al hacer rollback:", rollbackError);
        }
        throw error;
    }
}

module.exports = {
    crearPedido
};