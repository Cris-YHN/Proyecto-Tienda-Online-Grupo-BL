console.log("productos.js cargado");

const API = "http://localhost:3000/api/productos";

async function cargarProductos(tipo, valor, idContenedor) {

    try {

        const respuesta = await fetch(API);
        const productos = await respuesta.json();

        const productosFiltrados = productos.filter(producto => {

            if (tipo === "marca") {
                return producto.marca === valor;
            }

            if (tipo === "categoria") {
                return producto.categoria === valor;
            }

            return false;

        });

        const contenedor = document.getElementById(idContenedor);

        if (!contenedor) return;

        contenedor.innerHTML = "";

        productosFiltrados.forEach(producto => {

            contenedor.innerHTML += `
                <div class="col-6 col-lg-4">

                    <div class="prod-card">

                        <div class="prod-thumb">
                            <img
                                class="prod-thumb-img"
                                src="assets/img/productos/${producto.imagen}"
                                alt="${producto.nombre}">
                        </div>

                        <div class="prod-body">

                            <span class="prod-cat">
                                ${producto.marca}
                            </span>

                            <p class="prod-name">
                                ${producto.nombre}
                            </p>

                            <div class="prod-row">

                                <span class="prod-price">
                                    $${producto.precio}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// MARCAS
cargarProductos("marca", "Nike", "productosNike");
cargarProductos("marca", "Adidas", "productosAdidas");
cargarProductos("marca", "Puma", "productosPuma");

// CATEGORÍAS
cargarProductos("categoria", "Natación", "productosNatacion");
cargarProductos("categoria", "Tenis", "productosTenis");
cargarProductos("categoria", "Fútbol", "productosFutbol");