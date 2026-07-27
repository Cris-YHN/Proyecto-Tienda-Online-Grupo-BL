// Productos dinámicos — Rosario Sport
//
// Lee del backend real (/api/productos). La base devuelve "marca" y
// "categoria" (nombre de la categoría en la tabla Categorias), que no son
// exactamente los campos que usan las funciones de render de acá abajo
// (pensadas en un principio para 6 secciones: Nike/Adidas/Puma/Natación/
// Tenis/Fútbol). La función normalizarProducto() hace ese "traductor".

(function () {
    const DATA_URL = "/api/productos";

    // Productos que se muestran en la sección "Destacados" del inicio.
    // La base todavía no tiene una columna para esto, así que por ahora
    // se define acá a mano por nombre.
    const NOMBRES_DESTACADOS = [
        "Zapatillas Nike Running",
        "Camiseta Manchester City",
        "Raqueta de Tenis Pro",
        "Camiseta Argentina 86"
    ];

    // "Natación" / "Fútbol" -> "natacion" / "futbol" (sin tildes, sin espacios)
    function slug(texto) {
        return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    // Traduce una fila cruda de la API (id_producto, nombre, marca, descripcion,
    // precio, stock, imagen, id_categoria, categoria) al formato que usan
    // las cards y el modal.
    function normalizarProducto(p) {
        // La marca manda si existe (Nike/Adidas/Puma); si no, se agrupa por
        // el deporte (categoria) tal cual viene de la tabla Categorias.
        const grupo = p.marca ? slug(p.marca) : slug(p.categoria);

        return {
            id_producto: p.id_producto,
            nombre: p.nombre,
            descripcion: p.descripcion,
            precio: p.precio,
            stock: p.stock,
            imagen: "assets/img/productos/" + p.imagen,
            categoria_grupo: grupo,
            categoria_label: p.marca || p.categoria,
            badge: p.stock <= 0 ? "SIN STOCK" : null,
            destacado: NOMBRES_DESTACADOS.includes(p.nombre),
            // La base no tiene specs propias; armamos 2-3 líneas genéricas
            // con lo que sí tenemos disponible.
            specs: [
                "Categoría: " + p.categoria,
                p.marca ? "Marca: " + p.marca : null,
                p.stock > 0 ? "Stock disponible: " + p.stock + " unidades" : "Sin stock por el momento"
            ].filter(Boolean)
        };
    }

    let productosCache = [];

    function formatPrice(num) {
        return "$" + num.toLocaleString("es-AR");
    }

    function badgeHTML(badge) {
        return badge ? '<span class="prod-badge">' + badge + "</span>" : "";
    }

    function cardHTML(p) {
        return (
            '<div class="col-6 col-lg-4">' +
                '<div class="prod-card" data-id="' + p.id_producto + '">' +
                    '<div class="prod-thumb">' +
                        badgeHTML(p.badge) +
                        '<img class="prod-thumb-img" src="' + p.imagen + '" alt="' + p.nombre + '">' +
                    "</div>" +
                    '<div class="prod-body">' +
                        '<span class="prod-cat">' + p.categoria_label + "</span>" +
                        '<p class="prod-name">' + p.nombre + "</p>" +
                        '<div class="prod-row">' +
                            '<span class="prod-price">' + formatPrice(p.precio) + "</span>" +
                            '<div class="prod-actions">' +
                                '<button class="prod-add btn-view-detail" type="button" data-id="' + p.id_producto + '" aria-label="Ver detalle"><i class="fa-solid fa-eye"></i></button>' +
                                '<button class="prod-add btn-add-cart" type="button" aria-label="Agregar al carrito"><i class="fa-solid fa-plus"></i></button>' +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>"
        );
    }

    function renderInto(containerId, productos) {
        const el = document.getElementById(containerId);
        if (!el) return;
        el.innerHTML = productos.length
            ? productos.map(cardHTML).join("")
            : '<p class="cart-empty">Todavía no hay productos cargados acá.</p>';
    }

    function renderDestacados() {
        renderInto("destacados-row", productosCache.filter(function (p) { return p.destacado; }));
    }

    function renderCategorias() {
        const grupos = ["nike", "adidas", "puma", "natacion", "tenis", "futbol"];
        grupos.forEach(function (g) {
            renderInto(g + "-row", productosCache.filter(function (p) { return p.categoria_grupo === g; }));
        });
    }

    // ── Modal de detalle, compartido por todos los productos ──
    function openModal(id) {
        const p = productosCache.find(function (x) { return x.id_producto === id; });
        if (!p) return;

        document.getElementById("productModalLabel").textContent = p.nombre;
        const img = document.getElementById("productModalImg");
        img.src = p.imagen;
        img.alt = p.nombre;
        document.getElementById("productModalDesc").textContent = p.descripcion;

        const specsList = document.getElementById("productModalSpecs");
        specsList.innerHTML = (p.specs || [])
            .map(function (s) { return '<li><i class="fa-solid fa-check"></i>' + s + "</li>"; })
            .join("");

        // el botón "Agregar al carrito" del modal necesita saber qué producto mostrar
        const modalEl = document.getElementById("productModal");
        modalEl.dataset.currentId = p.id_producto;
        modalEl.dataset.currentName = p.nombre;
        modalEl.dataset.currentPrice = formatPrice(p.precio);

        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    }

    document.addEventListener("click", function (e) {
        const viewBtn = e.target.closest(".btn-view-detail");
        if (viewBtn) {
            openModal(parseInt(viewBtn.getAttribute("data-id"), 10));
            return;
        }

        // botón "Agregar al carrito" dentro del modal (no tiene .prod-card cerca,
        // así que cart.js no lo detecta solo; lo resolvemos acá)
        const modalAddBtn = e.target.closest("#productModalAddBtn");
        if (modalAddBtn) {
            const modalEl = document.getElementById("productModal");
            const id = parseInt(modalEl.dataset.currentId, 10);
            const name = modalEl.dataset.currentName;
            const priceText = modalEl.dataset.currentPrice;
            if (name && window.RosarioCart) {
                window.RosarioCart.addToCart(id, name, priceText);
            }
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        fetch(DATA_URL)
            .then(function (res) {
                if (!res.ok) throw new Error("Respuesta no válida: " + res.status);
                return res.json();
            })
            .then(function (data) {
                productosCache = data.map(normalizarProducto);
                if (document.getElementById("destacados-row")) renderDestacados();
                if (document.getElementById("nike-row")) renderCategorias();
            })
            .catch(function (err) {
                console.error("Error cargando productos:", err);
            });
    });
})();