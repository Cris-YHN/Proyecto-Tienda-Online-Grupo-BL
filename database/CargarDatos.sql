-- ==========================================
-- CARGA DE DATOS - Rosario Sport
-- ==========================================

USE RosarioSportDB;
GO

-- ==========================================
-- 1. CARGAR CATEGORÍAS
-- ==========================================

INSERT INTO Categorias (nombre)
VALUES
    ('Fútbol'),
    ('Running'),
    ('Natación'),
    ('Tenis');
GO

-- ==========================================
-- 2. CARGAR PRODUCTOS
-- ==========================================
-- Se agregó la columna "marca" (Nike/Adidas/Puma), que antes quedaba
-- sin cargar. Los productos sin marca puntual (Natación, Tenis, Fútbol
-- genérico) van con NULL.

INSERT INTO Productos (nombre, marca, descripcion, precio, stock, imagen, id_categoria)
VALUES

-- =========================
-- NIKE (Running - id_categoria = 2)
-- =========================
('Zapatillas Nike Running', 'Nike',
 'Zapatillas livianas pensadas para largas distancias, con entresuela amortiguada y mesh transpirable.',
 79999, 20, 'nike-zapatillas.jpg', 2),

('Campera Nike Rompeviento', 'Nike',
 'Campera liviana resistente al viento, ideal para entrenar al aire libre.',
 54999, 15, 'campera-rompeviento-nike-windrunner-blanca-510020da0001084-1.webp', 2),

('Short Nike Training', 'Nike',
 'Short deportivo de secado rápido con bolsillo interno.',
 24999, 30, 'nike-short.jpeg', 2),

-- =========================
-- ADIDAS (Running - id_categoria = 2)
-- =========================
('Zapatillas Adidas Running', 'Adidas',
 'Zapatillas con amortiguación de alta respuesta para entrenamientos diarios.',
 84999, 18, 'adidas-running.jpeg', 2),

('Camiseta Adidas Training', 'Adidas',
 'Camiseta transpirable con tejido que mantiene el cuerpo seco.',
 32999, 40, 'adidas-training.webp', 2),

('Mochila Adidas Classic', 'Adidas',
 'Mochila resistente con compartimento para notebook.',
 29999, 25, 'adidas-mochila.jpeg', 2),

-- =========================
-- PUMA (Fútbol - id_categoria = 1)
-- =========================
('Camiseta Manchester City', 'Puma',
 'Camiseta oficial del Manchester City con tecnología DryCELL.',
 69999, 20, 'puma-manchester.jpg', 1),

('Buzo Puma Essentials', 'Puma',
 'Buzo con capucha ideal para entrenamiento y uso diario.',
 47999, 20, 'puma-buzo.jpeg', 1),

('Medias Puma Deportivas x3', 'Puma',
 'Pack de tres pares de medias deportivas acolchadas.',
 11999, 50, 'puma-medias.webp', 1),

-- =========================
-- NATACIÓN (id_categoria = 3) — sin marca puntual
-- =========================
('Malla de Natación Pro', NULL,
 'Malla profesional resistente al cloro.',
 28999, 12, 'natacion-malla.jpg', 3),

('Gorro de Silicona', NULL,
 'Gorro siliconado de ajuste anatómico.',
 6999, 30, 'natacion-gorro.jpg', 3),

('Antiparras Antiempañantes', NULL,
 'Antiparras con lente UV400 antiempañante.',
 9499, 25, 'natacion-antiparras.jpg', 3),

-- =========================
-- TENIS (id_categoria = 4) — sin marca puntual
-- =========================
('Raqueta de Tenis Pro', NULL,
 'Raqueta profesional de excelente balance.',
 64999, 10, 'tenis-raqueta.webp', 4),

('Zapatillas para Polvo de Ladrillo', NULL,
 'Zapatillas con suela herringbone para canchas de polvo de ladrillo.',
 74999, 18, 'tenis-zapatilas.webp', 4),

('Tubo de Pelotas x3', NULL,
 'Pelotas presurizadas de alta durabilidad.',
 8999, 40, 'tenis-tubopelotas.jpeg', 4),

-- =========================
-- FÚTBOL (id_categoria = 1) — sin marca puntual
-- =========================
('Camiseta Argentina 86', NULL,
 'Réplica retro de la Selección Argentina campeona del mundo en 1986.',
 59999, 18, 'ArgentinaLCQ86.jpg', 1),

('Pelota de Fútbol N°5', NULL,
 'Pelota oficial termofusionada para césped natural y sintético.',
 22999, 35, 'futbol-pelota.webp', 1),

('Guantes de Arquero', NULL,
 'Guantes con palma de látex de alta adherencia.',
 18999, 16, 'futbol-guantes.webp', 1);
GO

-- ==========================================
-- 3. VERIFICAR QUE LOS DATOS SE CARGARON
-- ==========================================

SELECT 'Categorías cargadas:' AS Mensaje, COUNT(*) AS Total FROM Categorias;
GO

SELECT 'Productos cargados:' AS Mensaje, COUNT(*) AS Total FROM Productos;
GO

SELECT 
    p.id_producto,
    p.nombre AS Producto,
    p.marca,
    c.nombre AS Categoría,
    p.precio,
    p.stock,
    p.imagen
FROM Productos p
INNER JOIN Categorias c ON p.id_categoria = c.id_categoria
ORDER BY c.nombre, p.nombre;
GO
