// Autenticación — Rosario Sport
//
// Guarda { usuario, token } en localStorage bajo la clave "rs_auth" al hacer login/registro.

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

    window.RosarioAuth = {
        getAuth: getAuth,
        clearAuth: clearAuth
    };

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

    // ---------- Validaciones ----------

    const REGEX_NOMBRE = /^[A-Za-zÀ-ÿ\s]{2,50}$/;
    const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const REGEX_TELEFONO = /^\+?[0-9\s-]{7,15}$/;
    const REGEX_PASSWORD_MAYUS = /[A-Z]/;
    const REGEX_PASSWORD_MINUS = /[a-z]/;
    const REGEX_PASSWORD_NUM = /[0-9]/;
    const REGEX_PASSWORD_ESPECIAL = /[^A-Za-z0-9]/;

    // Valida los datos del login. Devuelve el primer mensaje de error o null si está OK.
    function validarLogin(email, contraseña) {
        if (!email) return "Ingresá tu email.";
        if (!REGEX_EMAIL.test(email)) return "El email no tiene un formato válido.";
        if (!contraseña) return "Ingresá tu contraseña.";
        return null;
    }

    // Valida los datos del registro. Devuelve el primer mensaje de error o null si está OK.
    function validarRegistro(datos) {
        if (!datos.nombre) return "El nombre es obligatorio.";
        if (!REGEX_NOMBRE.test(datos.nombre)) {
            return "El nombre debe tener entre 2 y 50 caracteres y solo letras.";
        }

        if (!datos.apellido) return "El apellido es obligatorio.";
        if (!REGEX_NOMBRE.test(datos.apellido)) {
            return "El apellido debe tener entre 2 y 50 caracteres y solo letras.";
        }

        if (!datos.email) return "El email es obligatorio.";
        if (!REGEX_EMAIL.test(datos.email)) return "El email no tiene un formato válido.";

        // Teléfono es opcional: solo se valida si el usuario cargó algo.
        if (datos.telefono && !REGEX_TELEFONO.test(datos.telefono)) {
            return "El teléfono no tiene un formato válido.";
        }

        // Dirección es opcional: solo se valida si el usuario cargó algo.
        if (datos.direccion && (datos.direccion.length < 5 || datos.direccion.length > 150)) {
            return "La dirección debe tener entre 5 y 150 caracteres.";
        }

        if (!datos["contraseña"]) return "La contraseña es obligatoria.";
        if (datos["contraseña"].length < 8) {
            return "La contraseña debe tener al menos 8 caracteres.";
        }
        if (!REGEX_PASSWORD_MAYUS.test(datos["contraseña"])) {
            return "La contraseña debe tener al menos una letra mayúscula.";
        }
        if (!REGEX_PASSWORD_MINUS.test(datos["contraseña"])) {
            return "La contraseña debe tener al menos una letra minúscula.";
        }
        if (!REGEX_PASSWORD_NUM.test(datos["contraseña"])) {
            return "La contraseña debe tener al menos un número.";
        }
        if (!REGEX_PASSWORD_ESPECIAL.test(datos["contraseña"])) {
            return "La contraseña debe tener al menos un carácter especial.";
        }

        return null;
    }

    // Lógica específica de cuenta.html (no rompe si estos elementos no existen)
    function initPaginaCuenta() {
        const panelAuth = document.getElementById("panelAuth");
        const panelLogueado = document.getElementById("panelLogueado");
        if (!panelAuth || !panelLogueado) return;

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

            const errorValidacion = validarLogin(email, contraseña);
            if (errorValidacion) {
                mostrarError(errorValidacion);
                return;
            }

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

            const errorValidacion = validarRegistro(body);
            if (errorValidacion) {
                mostrarError(errorValidacion);
                return;
            }

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