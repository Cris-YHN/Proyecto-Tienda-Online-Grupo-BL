// Carrito de compras — Rosario Sport
// Guarda los productos agregados en localStorage, así se mantienen
// aunque el usuario navegue entre index.html, categorias.html y contacto.html.

(function () {
    const CART_KEY = "rs_cart";

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
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

    function addToCart(name, priceText) {
        const cart = getCart();
        const price = parsePrice(priceText);
        const existing = cart.find(function (item) { return item.name === name; });

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name: name, price: price, qty: 1 });
        }

        saveCart(cart);
        updateBadge();
        renderCart();
    }

    function removeFromCart(name) {
        let cart = getCart();
        cart = cart.filter(function (item) { return item.name !== name; });
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
                    '<button class="cart-item-remove" data-name="' + item.name + '" aria-label="Quitar del carrito">' +
                        '<i class="fa-solid fa-xmark"></i>' +
                    '</button>' +
                '</div>';
            list.appendChild(row);
        });

        if (totalEl) totalEl.textContent = formatPrice(total);

        list.querySelectorAll(".cart-item-remove").forEach(function (btn) {
            btn.addEventListener("click", function () {
                removeFromCart(btn.getAttribute("data-name"));
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

        const nameTag = card.querySelector(".prod-name");
        const priceTag = card.querySelector(".prod-price");
        if (!nameTag || !priceTag) return;

        addToCart(nameTag.textContent.trim(), priceTag.textContent.trim());

        // pequeño feedback visual en el botón
        btn.classList.add("added");
        setTimeout(function () { btn.classList.remove("added"); }, 400);
    });

    document.addEventListener("DOMContentLoaded", function () {
        updateBadge();
        renderCart();
    });
})();