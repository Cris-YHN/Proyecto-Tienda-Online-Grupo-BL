-- 1. Tablas independientes
CREATE TABLE Categorias (
    id_categoria INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL
);
GO

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

-- 2. Tablas dependientes
CREATE TABLE Productos (
    id_producto INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(150) NOT NULL,
    marca NVARCHAR(50), -- Aquí agregué la columna
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

-- 3. Restricciones finales (CHECKS)
ALTER TABLE Productos ADD CONSTRAINT CK_Productos_Precio CHECK (precio >= 0);
ALTER TABLE Productos ADD CONSTRAINT CK_Productos_Stock CHECK (stock >= 0);
ALTER TABLE Pedidos ADD CONSTRAINT CK_Pedidos_Total CHECK (total >= 0);
ALTER TABLE DetallePedido ADD CONSTRAINT CK_DetallePedido_Cantidad CHECK (cantidad > 0);
ALTER TABLE DetallePedido ADD CONSTRAINT CK_DetallePedido_Precio CHECK (precio_unitario >= 0);
GO