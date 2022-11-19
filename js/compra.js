const compra = new Carrito(); //inicializar la clase
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById("carrito"); //selecciono toda la tabla de compra
const btnProcesarCompra = document.getElementById("procesar-compra");
const cliente = document.getElementById("cliente");
const correo = document.getElementById("correo");
const nombre = document.getElementById("nombre");
const tarjeta = document.getElementById("tarjeta");
const fecha = document.getElementById("fecha");
const cvv = document.getElementById("cvv");

cargarEventos();

function cargarEventos() {
    document.addEventListener("DOMContentLoaded", compra.leerLocalStorageCompra()) //apenas cargue la pagina aparecen los productos del carrito que se han cargado en el LS
    carrito.addEventListener("click", (e)=>{compra.eliminarProducto(e)}); //reutilizar el metodo de pedido.js
    compra.calcularTotal(); //calcular subtotal, igv, total
    btnProcesarCompra.addEventListener("click", procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });
}
//cuando se hace clic al boton Procesar Compra
function procesarCompra(e) {
    e.preventDefault();
    if(compra.obtenerProductosLocalStorage().length === 0){ //si no hay nada ni una compra
        Swal.fire({  //mostrar ventana
            type: 'error',
            title: 'No se puede realizar la compra',
            html: '<b>No haz seleccionado ni un producto</b>',
            timer: 2500,
            showConfirmButton: false,
        }).then(function(){ //y retornar al catalogo
            window.location = "catalogo.html";
        })
    }
    else if(cliente.value === "" || correo.value === "" || nombre.value === "" || tarjeta.value === "" || fecha.value === "" || cvv.value === ""){
        Swal.fire({  //mostrar ventana
            type: 'error',
            title: 'Ingrese los campos requeridos',
            timer: 2500,
            showConfirmButton: false,
        })
    }
    else {
        Swal.fire({
            type: 'success',
            title: 'Compra exitosa',
            showConfirmButton: false,
            timer: 3000, 
        }).then(() => {
            compra.vaciarLocalStorage();
            window.location = "index.html";
        })
    }
}
