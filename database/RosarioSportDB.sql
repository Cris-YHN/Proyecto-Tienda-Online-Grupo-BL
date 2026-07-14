/*
Proyecto: Rosario Sport
Base de Datos: SQL Server
*/

-- Crear la base de datos
CREATE DATABASE RosarioSportDB;
GO

-- Seleccionar la base de datos
USE RosarioSportDB;
GO

-- TABLA: Categorias
-- Guarda las categorías deportivas de la tienda


CREATE TABLE Categorias (
    id_categoria INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL
);
GO

-- TABLA: Productos
-- Guarda los productos deportivos de la tienda


CREATE TABLE Productos (
    id_producto INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(150) NOT NULL,
    descripcion NVARCHAR(500) NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    imagen NVARCHAR(255) NULL,
    id_categoria INT NOT NULL,

    CONSTRAINT FK_Productos_Categorias
        FOREIGN KEY (id_categoria)
        REFERENCES Categorias(id_categoria)
);
GO

-- TABLA: Usuarios
-- Guarda la información de los clientes


CREATE TABLE Usuarios (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    apellido NVARCHAR(100) NOT NULL,
    email NVARCHAR(150) NOT NULL UNIQUE,
    telefono NVARCHAR(20) NULL,
    direccion NVARCHAR(255) NULL,
    contraseña NVARCHAR(255) NOT NULL
);
GO

-- TABLA: Pedidos
-- Guarda los pedidos realizados por los usuarios

CREATE TABLE Pedidos (
    id_pedido INT IDENTITY(1,1) PRIMARY KEY,
    fecha DATETIME NOT NULL DEFAULT GETDATE(),
    total DECIMAL(10,2) NOT NULL,
    estado NVARCHAR(50) NOT NULL,
    id_usuario INT NOT NULL,

    CONSTRAINT FK_Pedidos_Usuarios
        FOREIGN KEY (id_usuario)
        REFERENCES Usuarios(id_usuario)
);
GO
-- TABLA: DetallePedido
-- Guarda los productos incluidos en cada pedido

CREATE TABLE DetallePedido (
    id_detalle INT IDENTITY(1,1) PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_DetallePedido_Pedidos
        FOREIGN KEY (id_pedido)
        REFERENCES Pedidos(id_pedido),

    CONSTRAINT FK_DetallePedido_Productos
        FOREIGN KEY (id_producto)
        REFERENCES Productos(id_producto)
);
GO


-- RESTRICCIONES DE INTEGRIDAD
-- Evitan que se ingresen datos inválidos


-- El precio de un producto no puede ser negativo
ALTER TABLE Productos
ADD CONSTRAINT CK_Productos_Precio
CHECK (precio >= 0);
GO

-- El stock no puede ser negativo
ALTER TABLE Productos
ADD CONSTRAINT CK_Productos_Stock
CHECK (stock >= 0);
GO

-- El total de un pedido no puede ser negativo
ALTER TABLE Pedidos
ADD CONSTRAINT CK_Pedidos_Total
CHECK (total >= 0);
GO

-- La cantidad de productos debe ser mayor que cero
ALTER TABLE DetallePedido
ADD CONSTRAINT CK_DetallePedido_Cantidad
CHECK (cantidad > 0);
GO

-- El precio unitario no puede ser negativo
ALTER TABLE DetallePedido
ADD CONSTRAINT CK_DetallePedido_Precio
CHECK (precio_unitario >= 0);
GO
