// Checkout — Rosario Sport
//
// Importante: los datos de la tarjeta (número, vencimiento, CVV) son solo
// para simular el flujo típico de compra — NO se procesan de verdad ni se
// mandan al backend. La tabla Pedidos no tiene ninguna columna para eso, y
// no corresponde guardar datos de tarjeta en la base de un proyecto de
// facultad. Lo único que se envía a /api/pedidos son los productos del
// carrito; el resto queda solo en el navegador.

(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const panelVacio = document.getElementById("panelVacio");
        const panelCheckout = document.getElementById("panelCheckout");
        const panelGracias = document.getElementById("panelGracias");
        const checkoutIntro = document.getElementById("checkoutIntro");
        if (!panelCheckout) return; 

        const auth = window.RosarioAuth && window.RosarioAuth.getAuth();
        if (!auth || !auth.usuario || !auth.token) {
            window.location.href = "login.html";
            return;
        }

        const cart = window.RosarioCart.getCart();
        const formatPrice = window.RosarioCart.formatPrice;

        if (cart.length === 0) {
            panelCheckout.style.display = "none";
            panelVacio.style.display = "block";
            return;
        }

        // Precarga nombre/apellido/email con lo que ya sabemos del usuario logueado
        document.getElementById("ckNombre").value = auth.usuario.nombre || "";
        document.getElementById("ckApellido").value = auth.usuario.apellido || "";
        document.getElementById("ckEmail").value = auth.usuario.email || "";

        // Resumen del pedido
        const resumenItems = document.getElementById("resumenItems");
        const resumenTotal = document.getElementById("resumenTotal");
        let total = 0;

        resumenItems.innerHTML = cart.map(function (item) {
            total += item.price * item.qty;
            return (
                '<div class="cart-item">' +
                    '<div>' +
                        '<p class="cart-item-name">' + item.name + '</p>' +
                        '<span class="cart-item-qty">x' + item.qty + '</span>' +
                    '</div>' +
                    '<span class="cart-item-price">' + formatPrice(item.price * item.qty) + '</span>' +
                '</div>'
            );
        }).join("");

        resumenTotal.textContent = formatPrice(total);

        // ── Validaciones de los campos de tarjeta ──
        const inputNumero = document.getElementById("ckNumeroTarjeta");
        const inputVencimiento = document.getElementById("ckVencimiento");
        const inputCvv = document.getElementById("ckCvv");

        // Autoformateo: va agregando espacios cada 4 dígitos mientras se escribe
        inputNumero.addEventListener("input", function () {
            const digits = inputNumero.value.replace(/\D/g, "").slice(0, 16);
            inputNumero.value = digits.replace(/(.{4})/g, "$1 ").trim();
        });

        // Autoformateo: agrega la barra después de los primeros 2 dígitos (MM/AA)
        inputVencimiento.addEventListener("input", function () {
            let digits = inputVencimiento.value.replace(/\D/g, "").slice(0, 4);
            if (digits.length > 2) {
                digits = digits.slice(0, 2) + "/" + digits.slice(2);
            }
            inputVencimiento.value = digits;
        });

        inputCvv.addEventListener("input", function () {
            inputCvv.value = inputCvv.value.replace(/\D/g, "").slice(0, 4);
        });

        function mostrarError(mensaje) {
            const el = document.getElementById("checkoutError");
            el.textContent = mensaje;
            el.style.display = "block";
        }
        function ocultarError() {
            document.getElementById("checkoutError").style.display = "none";
        }

        function validarFormulario() {
            const numero = inputNumero.value.replace(/\s/g, "");
            if (numero.length < 13 || numero.length > 16) {
                mostrarError("El número de tarjeta no es válido.");
                return false;
            }

            const vencMatch = inputVencimiento.value.match(/^(\d{2})\/(\d{2})$/);
            if (!vencMatch || parseInt(vencMatch[1], 10) < 1 || parseInt(vencMatch[1], 10) > 12) {
                mostrarError("El vencimiento tiene que tener el formato MM/AA.");
                return false;
            }

            if (inputCvv.value.length < 3) {
                mostrarError("El CVV no es válido.");
                return false;
            }

            return true;
        }

        // ── Envío del pedido ──
        document.getElementById("formCheckout").addEventListener("submit", function (e) {
            e.preventDefault();
            ocultarError();

            if (!e.target.checkValidity()) {
                mostrarError("Completá todos los campos obligatorios.");
                e.target.reportValidity();
                return;
            }
            if (!validarFormulario()) return;

            const items = cart.map(function (item) {
                return { id_producto: item.id_producto, cantidad: item.qty };
            });

            const btn = document.getElementById("btnConfirmarCompra");
            btn.disabled = true;
            btn.textContent = "Procesando...";

            fetch("/api/pedidos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + auth.token
                },
                body: JSON.stringify({ items: items })
            })
                .then(function (res) {
                    return res.json().then(function (data) {
                        return { ok: res.ok, data: data };
                    });
                })
                .then(function (result) {
                    if (!result.ok) {
                        mostrarError(result.data.mensaje || "No se pudo registrar el pedido.");
                        btn.disabled = false;
                        btn.textContent = "Confirmar compra";
                        return;
                    }

                    window.RosarioCart.vaciarCart();

                    checkoutIntro.style.display = "none";
                    panelCheckout.style.display = "none";
                    panelGracias.style.display = "block";
                    document.getElementById("graciasDetalle").textContent =
                        "Pedido #" + result.data.id_pedido + " — Total: " + formatPrice(result.data.total);
                })
                .catch(function () {
                    mostrarError("No se pudo conectar con el servidor.");
                    btn.disabled = false;
                    btn.textContent = "Confirmar compra";
                });
        });
    });
})();
