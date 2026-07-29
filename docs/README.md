# Documentación del Proyecto — Rosario Sport

## Descripción general

**Rosario Sport** es una tienda deportiva desarrollada como proyecto final de la materia. A diferencia de la versión inicial (sitio estático), el proyecto evolucionó a una aplicación **full-stack**: frontend en HTML/CSS/JS vanilla, backend en Node.js/Express, y base de datos en SQL Server, con catálogo dinámico, carrito, autenticación de usuarios y checkout funcional.

---

## Estructura del proyecto

```
Proyecto-Tienda-Online-Grupo-BL/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  → Conexión a SQL Server
│   │   ├── controllers/
│   │   │   ├── productoController.js
│   │   │   ├── usuarioController.js
│   │   │   └── pedidoController.js
│   │   ├── middlewares/
│   │   │   └── verificarToken.js      → Valida el JWT en rutas protegidas
│   │   ├── models/
│   │   │   ├── productoModel.js
│   │   │   ├── usuarioModel.js
│   │   │   └── pedidoModel.js         → Crea pedidos dentro de una transacción SQL
│   │   └── routes/
│   │       ├── productoRoutes.js
│   │       ├── usuarioRoutes.js
│   │       └── pedidoRoutes.js
│   ├── .env                           → Variables de entorno (NO se sube al repo)
│   ├── package.json
│   └── server.js
│
├── database/
│   ├── RosarioSportDB.sql             → Crea la base y las 5 tablas
│   ├── CargarDatos.sql                → Carga los 18 productos de prueba
│
├── docs/
│   └── README.md
│
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css             → Paleta dark premium + todos los componentes
│   │   ├── img/
│   │   │   ├── carrusel/              → Fotos del carrusel de inicio
│   │   │   └── productos/             → Fotos de cada producto
│   │   └── js/
│   │       ├── main.js                → Validación del formulario de contacto
│   │       ├── productos.js           → Trae los productos de la API y arma las cards + modal
│   │       ├── cart.js                → Carrito (localStorage), badge, agregar/quitar
│   │       ├── auth.js                → Login, registro, estado de sesión en la navbar
│   │       └── checkout.js            → Formulario de compra y confirmación del pedido
│   ├── index.html                     → Inicio (carrusel + destacados)
│   ├── categorias.html                → Catálogo completo (6 secciones)
│   ├── contacto.html                  → Formulario de contacto
│   ├── login.html                     → Iniciar sesión / crear cuenta
│   └── checkout.html                  → Datos de envío + tarjeta + confirmación
│
└── .gitignore
```

---

## Tecnologías utilizadas

**Frontend**
- HTML5, CSS3, JavaScript (vanilla, sin frameworks)
- Bootstrap 5.3.8 (grilla, navbar, carrusel, modales)
- Font Awesome 6.5 (íconos)

**Backend**
- Node.js + Express 5
- `mssql` — driver de conexión a SQL Server
- `bcryptjs` — hash de contraseñas
- `jsonwebtoken` — autenticación por token (JWT)
- `cors`, `dotenv`
- `nodemon` (dependencia de desarrollo)

**Base de datos**
- SQL Server 2022, corriendo en un contenedor Docker

---

## Cómo levantar el proyecto

1. **Encender la base de datos**
   ```
   desde SQL Server Management
   ```

2. **Crear la base y cargar los datos** (solo la primera vez, con la extensión mssql de VS Code o la herramienta que prefieran):
   ```
   database/RosarioSportDB.sql
   database/CargarDatos.sql
   ```

3. **Configurar las variables de entorno** — crear `backend/.env` con:
   ```
   DB_USER=sa
   DB_PASSWORD="tu_contraseña"
   DB_SERVER=localhost
   DB_DATABASE=RosarioSportDB
   PORT=3000
   JWT_SECRET=un_texto_random_bien_largo
   ```

4. **Instalar dependencias**
   ```
   cd backend
   npm install
   ```

5. **Levantar el servidor**
   ```
   npm run dev
   ```

6. **Abrir el sitio** en `http://localhost:3000` — Express sirve el frontend y la API desde el mismo puerto, así que no hace falta Live Server ni nada aparte.

---

## Páginas

### `index.html` — Inicio
Carrusel de imágenes reales (fade entre slides, tamaño controlado para no ocupar toda la pantalla) y una sección de **Destacados** con 4 productos que se cargan dinámicamente desde la base.

### `categorias.html` — Catálogo
Todos los productos, agrupados en 6 secciones: **Nike, Adidas, Puma** (por marca) y **Natación, Tenis, Fútbol** (por deporte). Los productos ya no están escritos a mano en el HTML: se piden a la API (`GET /api/productos`) y se arman las cards por JavaScript. Cada card tiene dos botones — ver detalle (abre un modal compartido con toda la info) y agregar al carrito.

### `contacto.html` — Contacto
Formulario con validación en tiempo real (nombre, email, mensaje), sin recargar la página.

### `login.html` — Cuenta
Pestañas de **Iniciar sesión** / **Crear cuenta**. Si ya hay una sesión activa, muestra un panel con los datos del usuario y un botón para cerrar sesión.

### `checkout.html` — Finalizar compra
Formulario con datos de contacto y de tarjeta (autoformateados mientras se escribe), resumen del pedido a un costado, y confirmación final. Requiere estar logueado — si no, se redirige a `login.html`.

---

## Funcionalidades implementadas

### Catálogo dinámico
`productos.js` trae los productos reales desde `/api/productos` y los agrupa por marca o por deporte según corresponda. Como la base no guarda todo lo que necesita el frontend (specs, destacados, etc.), esos datos se completan con una función de normalización en el mismo archivo.

### Carrito
Guardado en `localStorage`, persiste al navegar entre páginas. Cada ítem guarda su `id_producto` (necesario para poder generar el pedido después). El ícono de la navbar muestra la cantidad total.

### Autenticación
Registro y login contra `/api/usuarios`. Las contraseñas se guardan **hasheadas con bcrypt**, nunca en texto plano. Al loguearse se recibe un **token JWT** que se guarda en el navegador y se manda en cada pedido para identificar al usuario.

### Checkout y pedidos
Al confirmar la compra, el backend valida el stock real de cada producto, calcula el total con los precios de la base (nunca con lo que mande el navegador) y guarda todo dentro de una **transacción SQL**: si algo falla, no queda ningún dato a medias. Los datos de tarjeta que se piden en el formulario son solo para simular el flujo — no se procesan ni se guardan en ningún lado.

### Validación de contacto
`main.js` valida que el nombre no tenga números, que el email tenga `@`, y que el mensaje no esté vacío, mostrando los errores debajo de cada campo.

---

## Endpoints de la API

| Método | Ruta | Protegida | Descripción |
|---|---|---|---|
| GET | `/api/ping` | No | Chequeo rápido de que el servidor está vivo |
| GET | `/api/productos` | No | Lista todos los productos con su categoría |
| GET | `/api/productos/:id` | No | Detalle de un producto puntual |
| POST | `/api/usuarios/registro` | No | Crea una cuenta nueva |
| POST | `/api/usuarios/login` | No | Devuelve `{ usuario, token }` si las credenciales son correctas |
| POST | `/api/pedidos` | Sí (JWT) | Crea un pedido a partir de los productos del carrito |

---

## Base de datos

5 tablas: `Categorias`, `Usuarios`, `Productos` (con columna `marca` para Nike/Adidas/Puma), `Pedidos` y `DetallePedido`, con sus claves foráneas correspondientes. Incluye `CHECK constraints` para evitar precios, stock, cantidades o totales negativos.

---

## Decisiones de diseño

- **Paleta "dark premium"**: fondo `#0D0D1A`, superficies `#14142A`, acento verde `#00E5A8`, texto `#F4F4F8`.
- **Tipografía**: Archivo Black para títulos, Inter para texto general, JetBrains Mono para precios y etiquetas técnicas.
- **Modal de detalle único**: en vez de un modal por producto (inviable con datos dinámicos), hay un solo modal que se completa por JavaScript según el producto clickeado.
- **Bootstrap 5.3** para grilla, navbar, carrusel y modales; **Font Awesome** para íconos.
