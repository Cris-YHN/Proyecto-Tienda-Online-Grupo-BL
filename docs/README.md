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

### Decisión: navbar fija vs. sticky por página

Las páginas del proyecto usan distintos comportamientos de navbar:

| Página | Clase Bootstrap | Comportamiento |
|---|---|---|
| `index.html` | `fixed-top` | Flota sobre el contenido. Requiere `margin-top: 56px` manual en el carrusel para que el contenido no quede tapado. |
| `contacto.html` | `sticky-top` | Empuja el contenido hacia abajo al hacer scroll. No requiere compensación de margen. |

> **Recomendación**: unificar a `sticky-top` en todas las páginas para evitar el parche del `margin-top` y simplificar el CSS.

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

Página con formulario para que los usuarios envíen consultas. Utiliza el sistema de grilla y componentes de Bootstrap, junto con `styles.css` para los estilos de la tarjeta del formulario.

**Estructura de la página:**

1. **Encabezado** — Título `<h1>` y subtítulo `<h3>` fuera del contenedor, sin estilos personalizados (pendiente de mejorar).
2. **Formulario** — Centrado con `container > row > col-md-8 col-lg-6`, dentro de una `card` de Bootstrap con sombra (`shadow`) y padding (`p-4`). Campos:
   - **Nombre**: `input type="text"` con `id="nombre"`.
   - **Email**: `input type="email"` con `id="email"`.
   - **Mensaje**: `textarea` de 5 filas con `id="mensaje"`.
   - **Botón Enviar**: `btn btn-dark`, ancho completo con `d-grid`.
3. **Footer** — Idéntico al de `index.html`.

**Diferencias importantes respecto a `index.html`:**

| Aspecto | `index.html` | `contacto.html` |
|---|---|---|
| Comportamiento navbar | `fixed-top` (flota sobre el contenido) | `sticky-top` (empuja el contenido hacia abajo) |
| Font Awesome | ✅ Incluido | ❌ No incluido (los íconos del footer no se verán) |
| Link activo en navbar | "Inicio" marcado como active | "Inicio" marcado como active (debería ser "Contacto") |
| Tagline del footer | "Tienda Deportiva" | "Tu slogan aquí" (placeholder sin actualizar) |
| Descripción del footer | Texto real de la tienda | Texto genérico de placeholder |

> **⚠️ Bugs detectados en `contacto.html`:**
> 1. **Falta Font Awesome** en el `<head>`. Los íconos del footer (ubicación, teléfono, email, reloj y redes sociales) no se renderizan. Solución: agregar `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">`.
> 2. **Link activo incorrecto**: el `aria-current="page"` está en "Inicio" en lugar de "Contacto". Cambiar `active` al `<li>` de Contacto.
> 3. **Contenido del footer desactualizado**: el tagline dice "Tu slogan aquí" y la descripción es texto de plantilla. Debe sincronizarse con el footer de `index.html`.
> 4. **El formulario no tiene validación ni acción**: el `<form>` no tiene `action` ni validación JS. Actualmente no envía datos a ningún lado.

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
La navbar se repite en `index.html` y `contacto.html`. Al copiarla a nuevas páginas, verificar siempre:
1. Mantener la clase `.my-custom-navbar`.
2. Marcar como `active` el link de **la página actual** (no dejarlo siempre en "Inicio").
3. Decidir entre `fixed-top` (requiere `margin-top` de compensación) o `sticky-top` (recomendado).
4. Incluir los scripts de Bootstrap al final del `<body>`.

### Footer
El footer se repite en todas las páginas. Actualmente en `contacto.html` tiene contenido de placeholder sin actualizar ("Tu slogan aquí"). Al copiar el footer a nuevas páginas:
1. Copiar siempre desde `index.html`, que tiene el contenido correcto.
2. Incluir Font Awesome en el `<head>` o los íconos no se mostrarán.
3. Se recomienda en futuras versiones extraerlo a un archivo separado e incluirlo con `fetch()` o un bundler para evitar duplicación.

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

**Bugs a corregir primero:**
- [ ] Agregar Font Awesome en el `<head>` de `contacto.html` (íconos del footer rotos).
- [ ] Corregir el link `active` en la navbar de `contacto.html` (debe ser "Contacto", no "Inicio").
- [ ] Actualizar el footer de `contacto.html`: reemplazar "Tu slogan aquí" y el texto de placeholder.
- [ ] Agregar `action` al formulario de contacto o conectarlo a un servicio (ej: [Formspree](https://formspree.io)).
- [ ] Cambiar `lang="en"` a `lang="es"` en todos los archivos HTML.

**Mejoras de funcionalidad:**
- [ ] Implementar validación JS del formulario de contacto en `main.js`.
- [ ] Implementar validación del formulario de newsletter.
- [ ] Completar la página `categorias.html` con tarjetas de productos.
- [ ] Agregar meta tags de SEO (`description`, `og:image`, `og:title`).

**Mejoras de arquitectura:**
- [ ] Unificar el comportamiento de la navbar a `sticky-top` en todas las páginas.
- [ ] Extraer navbar y footer a componentes incluibles para evitar duplicación de código.
- [ ] Considerar un framework liviano como Astro para manejar layouts compartidos.

---

*Documentación generada para el proyecto Rosario Sport — 2025*