const carro = new Carrito();
const carrito = document.getElementById("carrito");
const productos = document.getElementById("lista-productos");
const listaProductos = document.querySelector("#lista-carrito tbody");//acceder a la tabla del carrito para agregar los productos seleccionados
const btnVaciarCarrito = document.getElementById("vaciar-carrito");
const btnProcesarPedido = document.getElementById("procesar-pedido");

cargarEventos();

function cargarEventos() {
    productos.addEventListener("click", (e)=>{carro.comprarProducto(e)}); //cuando se haga clic a un producto agregarlo al carrito
    carrito.addEventListener("click", (e)=>{carro.eliminarProducto(e)}); //cuando se haga clic al icono eliminar producto del carrito
    btnVaciarCarrito.addEventListener("click", (e)=>{carro.vaciarCarrito(e)});
    document.addEventListener("DOMContentLoaded", carro.leerLocalStorage()); //se lee el LS apenas carga la página
    btnProcesarPedido.addEventListener("click", (e)=>{carro.procesarPedido(e)});
}