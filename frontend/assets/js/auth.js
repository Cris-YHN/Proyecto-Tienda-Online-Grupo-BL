// Autenticación — Rosario Sport
//
// Guarda { usuario, token } en localStorage bajo la clave "rs_auth" al
// hacer login/registro. Otras páginas (como el futuro checkout) van a leer
// esto para saber quién es el usuario logueado.

(function () {
    const AUTH_KEY = "rs_auth";
    const API_BASE = "/api/usuarios";

    function getAuth() {
        try {
            return JSON.parse(localStorage.getItem(AUTH_KEY));
        } catch (e) {
            return null;
        }
    }

    function setAuth(data) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(data));
    }

    function clearAuth() {
        localStorage.removeItem(AUTH_KEY);
    }

    // Se expone para que otros scripts (cart.js en el checkout, más adelante)
    // puedan leer el usuario logueado y armar el header Authorization.
    window.RosarioAuth = {
        getAuth: getAuth,
        clearAuth: clearAuth
    };

    // ── Estado de la navbar (corre en TODAS las páginas) ──
    function actualizarNavbar() {
        const btn = document.getElementById("btn-account");
        if (!btn) return;

        const auth = getAuth();
        if (auth && auth.usuario) {
            btn.setAttribute("aria-label", "Mi cuenta (" + auth.usuario.nombre + ")");
            btn.setAttribute("title", auth.usuario.nombre);
            btn.classList.add("logueado");
        } else {
            btn.setAttribute("aria-label", "Iniciar sesión");
            btn.removeAttribute("title");
            btn.classList.remove("logueado");
        }
    }

    // ── Lógica específica de cuenta.html (no rompe si estos elementos no existen) ──
    function initPaginaCuenta() {
        const panelAuth = document.getElementById("panelAuth");
        const panelLogueado = document.getElementById("panelLogueado");
        if (!panelAuth || !panelLogueado) return; // no estamos en cuenta.html

        const auth = getAuth();

        function mostrarPanelLogueado() {
            panelAuth.style.display = "none";
            panelLogueado.style.display = "block";
            document.getElementById("cuentaTitulo").textContent = "Ya iniciaste sesión";
            document.getElementById("cuentaSubtitulo").textContent = "Podés seguir comprando tranquilo.";
            document.getElementById("nombreUsuario").textContent = auth.usuario.nombre;
            document.getElementById("emailUsuario").textContent = auth.usuario.email;
        }

        if (auth && auth.usuario) {
            mostrarPanelLogueado();
        }

        document.getElementById("btnCerrarSesion").addEventListener("click", function () {
            clearAuth();
            window.location.reload();
        });

        // Tabs login / registro
        const tabLogin = document.getElementById("tabLogin");
        const tabRegistro = document.getElementById("tabRegistro");
        const formLogin = document.getElementById("formLogin");
        const formRegistro = document.getElementById("formRegistro");
        const errorBox = document.getElementById("authError");

        function mostrarError(mensaje) {
            errorBox.textContent = mensaje;
            errorBox.style.display = "block";
        }
        function ocultarError() {
            errorBox.style.display = "none";
        }

        // Deshabilita el botón de submit mientras la petición está en curso,
        // para que un doble clic no dispare dos requests, y lo restaura
        // (con su texto original) apenas termina.
        function bloquearBoton(form, textoCargando) {
            const boton = form.querySelector("button[type='submit']");
            if (!boton) return function () {};

            const textoOriginal = boton.textContent;
            boton.disabled = true;
            boton.textContent = textoCargando;

            return function desbloquear() {
                boton.disabled = false;
                boton.textContent = textoOriginal;
            };
        }

        tabLogin.addEventListener("click", function (e) {
            e.preventDefault();
            tabLogin.classList.add("active-tab");
            tabRegistro.classList.remove("active-tab");
            formLogin.style.display = "block";
            formRegistro.style.display = "none";
            ocultarError();
        });

        tabRegistro.addEventListener("click", function (e) {
            e.preventDefault();
            tabRegistro.classList.add("active-tab");
            tabLogin.classList.remove("active-tab");
            formRegistro.style.display = "block";
            formLogin.style.display = "none";
            ocultarError();
        });

        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();
            ocultarError();

            const email = document.getElementById("loginEmail").value.trim();
            const contraseña = document.getElementById("loginPassword").value;
            const desbloquear = bloquearBoton(formLogin, "Ingresando...");

            fetch(API_BASE + "/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, "contraseña": contraseña })
            })
                .then(function (res) {
                    return res.json().then(function (data) {
                        return { ok: res.ok, data: data };
                    });
                })
                .then(function (result) {
                    if (!result.ok) {
                        mostrarError(result.data.mensaje || "No se pudo iniciar sesión.");
                        return;
                    }
                    setAuth(result.data);
                    actualizarNavbar();
                    mostrarPanelLogueadoConDatos(result.data);
                })
                .catch(function () {
                    mostrarError("No se pudo conectar con el servidor.");
                })
                .finally(desbloquear);
        });

        formRegistro.addEventListener("submit", function (e) {
            e.preventDefault();
            ocultarError();

            const body = {
                nombre: document.getElementById("regNombre").value.trim(),
                apellido: document.getElementById("regApellido").value.trim(),
                email: document.getElementById("regEmail").value.trim(),
                telefono: document.getElementById("regTelefono").value.trim(),
                direccion: document.getElementById("regDireccion").value.trim(),
                "contraseña": document.getElementById("regPassword").value
            };
            const desbloquear = bloquearBoton(formRegistro, "Creando cuenta...");

            fetch(API_BASE + "/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
                .then(function (res) {
                    return res.json().then(function (data) {
                        return { ok: res.ok, data: data };
                    });
                })
                .then(function (result) {
                    if (!result.ok) {
                        mostrarError(result.data.mensaje || "No se pudo crear la cuenta.");
                        return;
                    }
                    setAuth(result.data);
                    actualizarNavbar();
                    mostrarPanelLogueadoConDatos(result.data);
                })
                .catch(function () {
                    mostrarError("No se pudo conectar con el servidor.");
                })
                .finally(desbloquear);
        });

        function mostrarPanelLogueadoConDatos(data) {
            panelAuth.style.display = "none";
            panelLogueado.style.display = "block";
            document.getElementById("cuentaTitulo").textContent = "¡Listo!";
            document.getElementById("cuentaSubtitulo").textContent = "Ya podés seguir comprando.";
            document.getElementById("nombreUsuario").textContent = data.usuario.nombre;
            document.getElementById("emailUsuario").textContent = data.usuario.email;
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        actualizarNavbar();
        initPaginaCuenta();
    });
})();