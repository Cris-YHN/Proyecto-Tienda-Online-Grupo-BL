# Rosario Sport — Documentación del Proyecto

## Índice
1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Arquitectura y Decisiones de Diseño](#arquitectura-y-decisiones-de-diseño)
5. [Páginas y Funcionalidades](#páginas-y-funcionalidades)
6. [Sistema de Estilos (CSS)](#sistema-de-estilos-css)
7. [JavaScript (main.js)](#javascript-mainjs)
8. [Responsividad](#responsividad)
9. [Componentes Reutilizables](#componentes-reutilizables)
10. [Guía para Futuros Desarrolladores](#guía-para-futuros-desarrolladores)

---

## Descripción General

**Rosario Sport** es una tienda deportiva online ubicada en España 399, Rosario, Santa Fe. El sitio web es una landing/tienda estática desarrollada con HTML5, CSS3 y JavaScript vanilla, apoyada en Bootstrap 5 como framework de diseño responsivo.

El proyecto tiene como objetivo ofrecer una experiencia de navegación moderna, atractiva y adaptable a cualquier dispositivo, presentando productos deportivos con una identidad visual oscura y profesional.

---

## Estructura del Proyecto

```
PROYECTO-TIENDA/
│
├── assets/
│   ├── css/
│   │   └── styles.css          # Estilos personalizados del sitio
│   ├── img/
│   │   └── Carrusel/
│   │       ├── 1.png           # Imagen del slide 1
│   │       ├── 2.png           # Imagen del slide 2
│   │       └── 3.png           # Imagen del slide 3
│   └── js/
│       └── main.js             # Lógica JavaScript personalizada
│
├── docs/
│   └── README.md               # Este archivo de documentación
│
├── .gitignore                  # Archivos ignorados por Git
├── index.html                  # Página principal (Home)
├── categorias.html             # Página de categorías de productos
└── contacto.html               # Página de contacto
```

### Descripción de cada archivo

| Archivo | Propósito |
|---|---|
| `index.html` | Página de inicio con navbar, carrusel de imágenes y footer completo |
| `categorias.html` | Listado o grilla de categorías de productos deportivos |
| `contacto.html` | Formulario de contacto y datos de la tienda |
| `assets/css/styles.css` | Todos los estilos personalizados que extienden Bootstrap |
| `assets/js/main.js` | Lógica JS adicional (actualmente preparado para futuras funciones) |
| `assets/img/Carrusel/` | Imágenes usadas en el slider de la página principal |

---

## Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| HTML5 | — | Estructura semántica de las páginas |
| CSS3 | — | Estilos personalizados y responsive design |
| JavaScript (Vanilla) | ES6+ | Interactividad del sitio |
| Bootstrap | 5.3.8 | Grid system, navbar, carrusel, componentes UI |
| Font Awesome | 6.5.0 | Íconos (redes sociales, contacto, etc.) |

Todas las dependencias externas se cargan via **CDN**, por lo que no se requiere instalación de paquetes ni Node.js para ejecutar el proyecto.

---

## Arquitectura y Decisiones de Diseño

### ¿Por qué Bootstrap?

Se eligió Bootstrap 5 por las siguientes razones:

- **Velocidad de desarrollo**: Sus componentes prediseñados (navbar, carrusel, botones) aceleran la construcción del sitio.
- **Responsividad incluida**: El sistema de grilla de Bootstrap garantiza adaptación a todos los tamaños de pantalla sin escribir media queries complejas.
- **Compatibilidad**: Bootstrap 5 funciona en todos los navegadores modernos sin depender de jQuery.

### Paleta de colores

El sitio utiliza una identidad visual oscura y elegante:

| Variable / Color | Hex | Uso |
|---|---|---|
| Fondo oscuro principal | `#1A1A2E` | Navbar, footer, fondo de elementos |
| Fondo de página | `#F4F7FB` | Cuerpo general de la página |
| Acento dorado | `#ffc107` | Hover de links, botones CTA, hover en redes |
| Texto oscuro | `#12121F` | Texto sobre fondos claros |
| Blanco | `#ffffff` | Texto sobre fondos oscuros |

Esta combinación genera contraste alto y una estética deportiva premium.

### Decisión: navbar fija (`fixed-top`)

La navbar usa `fixed-top` de Bootstrap para permanecer visible mientras el usuario hace scroll. Para evitar que el contenido quede oculto detrás de la navbar (que mide 56px), se aplica un `margin-top: 56px` al carrusel directamente en el HTML.

### Decisión: Footer dentro del carrusel en el HTML

El footer se ubica como hermano del carrusel dentro del mismo contenedor `<div>` por razones de estructura de flujo de página. Esto es un punto que puede refactorizarse en futuras versiones para mejorar la semántica.

---

## Páginas y Funcionalidades

### `index.html` — Página Principal

**Secciones:**

1. **Barra de Navegación (`<nav>`)**
   - Fija en la parte superior (`fixed-top`).
   - Logo/marca: *Rosario Sport*.
   - Links: Inicio, Categorías, Contacto.
   - En mobile: colapsa en un menú hamburguesa (comportamiento nativo de Bootstrap).
   - Clase personalizada: `.my-custom-navbar` para aplicar colores propios.

2. **Carrusel de Imágenes (`#carouselExampleCaptions`)**
   - 3 slides con imágenes de productos.
   - Cada slide tiene un botón **"Comprar"** centrado sobre la imagen.
   - Las imágenes tienen `filter: brightness(0.6)` para que el texto superpuesto sea legible.
   - Incluye indicadores (puntitos) y flechas de navegación.

3. **Footer**
   - Diseñado en 4 columnas usando CSS Grid.
   - **Columna 1**: Marca, descripción y formulario de newsletter.
   - **Columna 2**: Links de tienda (Todos los productos, Novedades, Ofertas).
   - **Columna 3**: Links de ayuda (Cómo comprar, Envíos, FAQ, etc.).
   - **Columna 4**: Datos de contacto con íconos + redes sociales.
   - **Barra inferior**: Copyright, métodos de pago y links legales.

### `contacto.html` — Formulario de Contacto

Página con formulario para que los usuarios envíen consultas. Utiliza Bootstrap para el layout y `styles.css` para la presentación del formulario con sombra y border-radius.

### `categorias.html` — Categorías

Página destinada a mostrar las categorías de productos de la tienda. (Estructura pendiente de completar según el catálogo).

---

## Sistema de Estilos (CSS)

El archivo `styles.css` está organizado en las siguientes secciones:

### 1. Reset y base del `body`
```css
body {
    font-family: sans-serif;
    background-color: #F4F7FB;
    color: #12121F;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
```
El `min-height: 100vh` junto con `flex-direction: column` garantiza que el footer siempre quede al pie de la página, incluso si el contenido es escaso.

### 2. Navbar personalizada (`.my-custom-navbar`)
Sobrescribe los estilos de Bootstrap para aplicar la paleta del proyecto.

> **⚠️ IMPORTANTE**: La clase `.my-custom-navbar` debe coincidir exactamente con la clase aplicada en el HTML. Si se renombra la navbar en el HTML, debe actualizarse también en el CSS.

### 3. Carrusel
- `.d-img`: Las imágenes ocupan el 100% del ancho con `brightness(0.6)` para oscurecer.
- `.carousel-caption`: Posiciona el botón "Comprar" sobre la imagen.
- `#carouselExampleCaptions`: Aplica `margin-top: 56px` para compensar la navbar fija.

### 4. Footer
El footer usa **CSS Grid** en lugar del grid de Bootstrap para mayor control:

```css
.footer-grid {
    display: grid;
    grid-template-columns: 2.2fr 1fr 1fr 1.2fr;
    gap: 3rem;
}
```

Las 4 columnas tienen proporciones distintas: la columna de marca ocupa más espacio (2.2fr) porque contiene el newsletter.

### 5. Formulario de Newsletter
El input y el botón están unidos visualmente con `border-radius` complementario:
- Input: `border-radius: 4px 0 0 4px`
- Botón: `border-radius: 0 4px 4px 0`

---

## JavaScript (main.js)

El archivo `main.js` está actualmente vacío y preparado para futuras funcionalidades. Bootstrap 5 gestiona de forma autónoma el carrusel y el menú hamburguesa usando su propio bundle de JavaScript.

**Funcionalidades JS planificadas para implementar:**
- Validación del formulario de newsletter.
- Validación del formulario de contacto.
- Filtros dinámicos en la página de categorías.
- Carrito de compras (localStorage).
- Animaciones de scroll (Intersection Observer).

---

## Responsividad

El sitio es completamente responsivo con tres puntos de quiebre:

| Breakpoint | Ancho | Cambios principales |
|---|---|---|
| Desktop | > 992px | Layout completo de 4 columnas en footer |
| Tablet | ≤ 992px | Footer en 2 columnas; footer brand ocupa todo el ancho |
| Mobile | ≤ 576px | Footer en 1 columna; indicadores del carrusel ocultos; botón más pequeño |

La navbar usa el breakpoint `navbar-expand-lg` de Bootstrap, que colapsa en hamburguesa en pantallas menores a 992px.

---

## Componentes Reutilizables

### Navbar
Para reutilizar la navbar en `categorias.html` y `contacto.html`, copiar el bloque `<nav>` completo de `index.html`. Asegurarse de:
1. Mantener la clase `.my-custom-navbar`.
2. Marcar como `active` el link de la página actual.
3. Incluir los scripts de Bootstrap al final del `<body>`.

### Footer
El footer también es reutilizable. Se recomienda en futuras refactorizaciones extraerlo a un archivo separado e incluirlo con un `fetch()` o template HTML para evitar duplicación de código.

---

## Guía para Futuros Desarrolladores

### Cómo correr el proyecto

No requiere instalación. Simplemente abrir `index.html` en el navegador, o usar una extensión como **Live Server** en VS Code para desarrollo.

### Agregar una nueva página

1. Crear un archivo `.html` en la raíz del proyecto.
2. Copiar la estructura base de `index.html` (head + navbar + footer + scripts).
3. Agregar el link en la navbar de todas las páginas existentes.

### Agregar imágenes al carrusel

1. Colocar la imagen en `assets/img/Carrusel/`.
2. En `index.html`, duplicar un bloque `.carousel-item` y actualizar el `src` y `alt`.
3. Agregar el botón indicador correspondiente en `.carousel-indicators`.

### Convenciones de nombres

- **Clases CSS**: kebab-case (ej: `footer-brand`, `social-links`).
- **IDs HTML**: camelCase (ej: `carouselExampleCaptions`, `navbarNav`).
- **Archivos**: lowercase con guiones (ej: `styles.css`, `main.js`).

### Mejoras sugeridas

- [ ] Extraer navbar y footer a componentes incluibles (o usar un framework como Astro/Vue).
- [ ] Implementar la lógica de `main.js` para el formulario de newsletter.
- [ ] Completar la página `categorias.html` con tarjetas de productos.
- [ ] Agregar meta tags de SEO (description, og:image, etc.).
- [ ] Cambiar `lang="en"` a `lang="es"` en todos los archivos HTML.
- [ ] Conectar el formulario de contacto a un backend o servicio como Formspree.

---

*Documentación generada para el proyecto Rosario Sport — 2025*