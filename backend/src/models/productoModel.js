// Datos temporales mientras se integra SQL Server

const productos = [
    {
        id: 1,
        nombre: "Remera Deportiva",
        precio: 25000
    },
    {
        id: 2,
        nombre: "Short Running",
        precio: 18000
    }
];

const obtenerTodos = () => {
    return productos;
};

module.exports = {
    obtenerTodos
};