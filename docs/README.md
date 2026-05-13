# Documentación del Proyecto — Rosario Sport

## Descripción general

**Rosario Sport** es una tienda deportiva ficticia desarrollada como proyecto web estático. El sitio permite a los usuarios explorar productos deportivos organizados por categoría y ponerse en contacto con la tienda mediante un formulario.

---

## Estructura del proyecto

```
PROYECTO-TIENDA/
├── assets/
│   ├── css/
│   │   └── styles.css       → Estilos personalizados
│   ├── img/
│   │   ├── Carrusel/        → Imágenes del carrusel (1.png, 2.png, 3.png)
│   │   └── productos/       → Imágenes de productos individuales
│   └── js/
│       └── main.js          → Validación del formulario de contacto
├── docs/
│   └── README.md
├── index.html               → Página principal
├── categorias.html          → Página de categorías y productos
└── contacto.html            → Página de contacto con formulario
```

---

## Páginas

### index.html — Inicio
Página principal del sitio. Contiene la barra de navegación fija y un **carrusel de imágenes** (Bootstrap Carousel) con tres slides, cada uno con un botón de "Comprar". Es la primera impresión del sitio para el usuario.

### categorias.html — Categorías
Muestra los productos organizados en tres secciones: **Fútbol**, **Básquet** y **Natación**. Cada producto se presenta como una **card de Bootstrap** con imagen, nombre, descripción y botón "Ver detalle". Se usa un sistema de grilla responsiva (`col-12 col-md-6 col-lg-4`) para adaptar el layout a distintos tamaños de pantalla.

### contacto.html — Contacto
Contiene un formulario con tres campos: nombre, email y mensaje. Incluye validación en tiempo real mediante JavaScript y muestra mensajes de error bajo cada campo cuando corresponde.

---

## Decisiones de diseño

- **Paleta de colores:** fondo oscuro (`#1A1A2E`) con acentos en amarillo/dorado (`#ffc107`), generando una estética moderna y deportiva.
- **Bootstrap 5.3:** se utilizó como framework principal para la grilla, navbar, carrusel y cards, lo que agilizó el desarrollo responsivo.
- **Font Awesome:** se incorporó para los íconos del footer (ubicación, teléfono, redes sociales, etc.).
- **Navbar fija:** en `index.html` y `categorias.html` la navbar usa `fixed-top`, con un `margin-top` en el contenido para compensar.
- **Footer consistente:** el mismo footer aparece en las tres páginas, con columnas de información, newsletter y métodos de pago.

---

## Funcionalidades implementadas

### Carrusel de imágenes
Implementado con el componente Carousel de Bootstrap. Permite navegar entre tres imágenes con controles de anterior/siguiente e indicadores de posición.

### Grilla de productos
Las cards de productos en `categorias.html` se organizan en filas responsivas. En pantallas grandes muestran 3 columnas, en tablets 2 y en móviles 1.

### Validación del formulario (`main.js`)
La función de validación se activa al hacer submit. Verifica:
- Que el **nombre** no esté vacío y no contenga números.
- Que el **email** no esté vacío y contenga `@`.
- Que el **mensaje** no esté vacío.

Si hay errores, los muestra debajo de cada campo sin recargar la página (`event.preventDefault()`). Si todo es válido, muestra una alerta de éxito y resetea el formulario.

### Responsividad
El sitio se adapta a distintos tamaños de pantalla mediante media queries en `styles.css` y el sistema de grilla de Bootstrap. El footer pasa de 4 columnas en escritorio a 1 columna en móvil.