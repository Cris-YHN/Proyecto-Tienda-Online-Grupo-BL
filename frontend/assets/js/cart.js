// Carrito de compras — Rosario Sport
// Guarda los productos agregados en localStorage, así se mantienen
// aunque el usuario navegue entre index.html, categorias.html y contacto.html.

(function () {
    const CART_KEY = "rs_cart";

    function getCart() {
        let cart;
        try {
            cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (e) {
            cart = [];
        }

        // Limpieza: descarta items guardados con una versión vieja del carrito
        // (de antes de que el id_producto se empezara a guardar), que quedarían
        // con id_producto undefined/NaN y romperían el checkout.
        const limpio = cart.filter(function (item) {
            return typeof item.id_producto === "number" && !isNaN(item.id_producto);
        });
        if (limpio.length !== cart.length) {
            saveCart(limpio);
        }
        return limpio;
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function vaciarCart() {
        saveCart([]);
        updateBadge();
        renderCart();
    }

    function parsePrice(text) {
        // "$79.999" -> 79999
        const digits = text.replace(/[^0-9]/g, "");
        return parseInt(digits, 10) || 0;
    }

    function formatPrice(num) {
        return "$" + num.toLocaleString("es-AR");
    }

    function updateBadge() {
        const cart = getCart();
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        document.querySelectorAll(".badge-count").forEach(function (el) {
            el.textContent = totalQty;
        });
    }

    function addToCart(id_producto, name, priceText) {
        const cart = getCart();
        const price = parsePrice(priceText);
        const existing = cart.find(function (item) { return item.id_producto === id_producto; });

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ id_producto: id_producto, name: name, price: price, qty: 1 });
        }

        saveCart(cart);
        updateBadge();
        renderCart();
    }

    function removeFromCart(id_producto) {
        let cart = getCart();
        cart = cart.filter(function (item) { return item.id_producto !== id_producto; });
        saveCart(cart);
        updateBadge();
        renderCart();
    }

    function renderCart() {
        const list = document.getElementById("cartItemsList");
        const emptyMsg = document.getElementById("cartEmptyMsg");
        const totalEl = document.getElementById("cartTotal");
        if (!list) return; // esta página no tiene el modal de carrito

        const cart = getCart();
        list.innerHTML = "";

        if (emptyMsg) emptyMsg.style.display = cart.length === 0 ? "block" : "none";

        let total = 0;
        cart.forEach(function (item) {
            total += item.price * item.qty;

            const row = document.createElement("div");
            row.className = "cart-item";
            row.innerHTML =
                '<div>' +
                    '<p class="cart-item-name">' + item.name + '</p>' +
                    '<span class="cart-item-qty">x' + item.qty + '</span>' +
                '</div>' +
                '<div class="cart-item-actions">' +
                    '<span class="cart-item-price">' + formatPrice(item.price * item.qty) + '</span>' +
                    '<button class="cart-item-remove" data-id="' + item.id_producto + '" aria-label="Quitar del carrito">' +
                        '<i class="fa-solid fa-xmark"></i>' +
                    '</button>' +
                '</div>';
            list.appendChild(row);
        });

        if (totalEl) totalEl.textContent = formatPrice(total);

        list.querySelectorAll(".cart-item-remove").forEach(function (btn) {
            btn.addEventListener("click", function () {
                removeFromCart(parseInt(btn.getAttribute("data-id"), 10));
            });
        });
    }

    // Delegación de eventos: cualquier botón "+" con la clase .btn-add-cart
    // dentro de una card agrega ese producto al carrito.
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".btn-add-cart");
        if (!btn) return;

        const card = btn.closest(".prod-card");
        if (!card) return;

        const id_producto = parseInt(card.getAttribute("data-id"), 10);
        const nameTag = card.querySelector(".prod-name");
        const priceTag = card.querySelector(".prod-price");
        if (!nameTag || !priceTag) return;

        addToCart(id_producto, nameTag.textContent.trim(), priceTag.textContent.trim());

        // pequeño feedback visual en el botón
        btn.classList.add("added");
        setTimeout(function () { btn.classList.remove("added"); }, 400);
    });

    // Botón "Finalizar compra": si no hay sesión iniciada, se avisa al
    // usuario en vez de dejarlo continuar. Si ya está logueado, lo mandamos
    // a checkout.html (ahí se pide nombre/tarjeta/etc. y se confirma el
    // pedido). Depende de window.RosarioAuth, que expone auth.js.
    document.addEventListener("click", function (e) {
        const btn = e.target.closest("#btnFinalizarCompra");
        if (!btn) return;

        const auth = window.RosarioAuth && window.RosarioAuth.getAuth();
        const yaLogueado = auth && auth.usuario && auth.token;

        if (yaLogueado) {
            window.location.href = "checkout.html";
            return;
        }

        const cartModalEl = document.getElementById("cartModal");
        const loginModalEl = document.getElementById("loginRequiredModal");
        if (!loginModalEl || typeof bootstrap === "undefined") return;

        const cartModal = cartModalEl && bootstrap.Modal.getInstance(cartModalEl);
        if (cartModal) {
            cartModalEl.addEventListener("hidden.bs.modal", function mostrarAviso() {
                cartModalEl.removeEventListener("hidden.bs.modal", mostrarAviso);
                bootstrap.Modal.getOrCreateInstance(loginModalEl).show();
            });
            cartModal.hide();
        } else {
            bootstrap.Modal.getOrCreateInstance(loginModalEl).show();
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        updateBadge();
        renderCart();
    });

    // Se expone para que otros scripts (como productos.js, desde el modal
    // de detalle, y checkout.js) puedan leer/modificar el carrito sin
    // duplicar esta lógica.
    window.RosarioCart = {
        addToCart: addToCart,
        getCart: getCart,
        vaciarCart: vaciarCart,
        updateBadge: updateBadge,
        formatPrice: formatPrice
    };
})();