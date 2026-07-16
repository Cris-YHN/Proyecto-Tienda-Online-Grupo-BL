require("dotenv").config();

const sql = require("mssql");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,

    options: {
        instanceName: "SQLEXPRESS",
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

async function conectarDB() {
    try {
        console.log(config);
        const pool = await sql.connect(config);
        console.log("Conexión a SQL Server establecida correctamente.");
        return pool;
    } catch (error) {
        console.error("Error al conectar con SQL Server:", error);
    }
}

module.exports = {
    sql,
    conectarDB
};