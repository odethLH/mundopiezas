class Carrito {
    //Añadir producto a carrito
    comprarProducto(e) {
        e.preventDefault();
        if(e.target.classList.contains("agregar-carrito")){ //si se presiona el boton comprar
            const producto = e.target.parentElement.parentElement; //guardamos el valor
            this.leerDatosProducto(producto); //llamamos al metodo para pasar el producto
        } 
    }
    //método para leer datos del producto
    leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector("img").src,
            titulo: producto.querySelector("h5").textContent,
            precio: producto.querySelector("span").textContent,
            id: producto.querySelector("a").getAttribute("data-id"), //permite que al eliminar un producto se elimine solo el que selecciono
            cantidad: 1,
        }
        //para que el producto no aparezca 2 veces cuando lo selecciono
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS){
            if(productoLS.id === infoProducto.id){  //si el ID del producto seleccionado coincide con el que ya tengo en el LS
                productosLS = productoLS.id; //lo almaceno en productosLS
            }
        });
        if(productosLS === infoProducto.id){ //comparo si los ID coinciden
            //mostrar mensaje de alerta
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El producto ya ha sido agregado',
                timer: 1500,
                showConfirmButton: false,
            })
        }
        else {
            this.insertarCarrito(infoProducto);
        }
        
    }
    //metodo para insertar la información del producto al carrito
    insertarCarrito(producto) {
        //crear una tabla para agregar la información
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto); //para guardar productos en LS
    }
    //metodo para eliminar productos seleccionados
    eliminarProducto(e) { //parametro e para que se cargue por defecto
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains("borrar-producto")){ //si se da clic al icono de la clase borrar producto
            e.target.parentElement.parentElement.remove(); //se elimina
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector("a").getAttribute("data-id"); //para eliminarlo cuando se este almacenando en el local-storage -aun no se utiliza
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal(); //para poder actualizar el monto total cuando se elimine un producto en la página de compras
    }
    //metodo para vaciar el carrito
    vaciarCarrito(e) {
        e.preventDefault();
        while(listaProductos.firstChild){ //mientras exista un 1er elemento
            listaProductos.removeChild(listaProductos.firstChild); //hay que removerlo
        }
        this.vaciarLocalStorage(); //ahora no solo se borra del DOM, sino tambien del LS
        return false; //para que salga del bucle
    }

    //ALMACENAR en LOCAL STORAGE, es decir almacenar datos localmente en el navegador

    guardarProductosLocalStorage(producto) {
        let productos;
        productos = this.obtenerProductosLocalStorage(); //obtener los productos que ya se encuentran en en local storage
        productos.push(producto); //si hay producto, agregrarlos
        localStorage.setItem("productos", JSON.stringify(productos)) //crear el LS y guardar productos
    }
    //creamos metodo, esto para saber si hay o no elementos en el LS, si los hay entonces se agregarán más luego del ultimo
    obtenerProductosLocalStorage() {
        let productoLS;
        //comprobar si hay elementos
        if(localStorage.getItem("productos") === null){
            productoLS = []; //si no hay queda vacio
        }
        else {
            productoLS = JSON.parse(localStorage.getItem("productos"));
        }
        return productoLS;
    }
    //eliminar productos por ID del LS
    eliminarProductoLocalStorage(productoID) {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage(); //obtener elementos del LS
        productosLS.forEach(function(productoLS, index){ //compararlos y con index ubicamos su posición
            if(productoLS.id === productoID) { //comparar ID de producto eliminado
                productosLS.splice(index, 1); //borrar elemento en posición index 1
            }
        });
        localStorage.setItem("productos", JSON.stringify(productosLS)); //actualizar
    }
    //metodo para leer los elementos del LS apenas cargue la página
    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){ //recorrer el arreglo
            const row = document.createElement("tr"); //para que los datos en la tabla aparezcan, se leerán los datos del LS
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
        listaProductos.appendChild(row);
        });
    }
    //metodo para vaciar LS, porque al vaciar el carrito los datos siguen en el LS
    vaciarLocalStorage() {
        localStorage.clear();
    }

    //PROCESAR PEDIDOS PARA PAGO
    procesarPedido(e) {
        e.preventDefault();
        if(this.obtenerProductosLocalStorage().length === 0){ //si no hay productos en el carrito no me lleva a la página de compras
            Swal.fire({
                type: 'error',
                title: 'Carrito vacío',
                html: '<b>Agregar algún producto</b>',
                timer: 2000,
                showConfirmButton: false,
            })
        }
        else {
            location.href = "compra.html";
        }
    }

    //LEER LOS PRODUCTOS PARA COMPRAR
    leerLocalStorageCompra() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){ //recorrer el arreglo
            const row = document.createElement("tr"); //para que los datos aparezcan, se leerán los datos del LS
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" style="text-align:center; width:100px" min="1" value=${producto.cantidad}>
                </td>
                <td id="subtotales">${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size: 25px" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row); //para aumentar cada producto
        });
    }

    //CALCULAR TOTAL, SUBTOTAL E IGV
    calcularTotal(){
        let productosLS;
        let total=0, subtotal=0, igv=0;
        //obtener los productos del LS
        productosLS = this.obtenerProductosLocalStorage();
        for(let i=0; i<productosLS.length; i++){ //recorrer el LS
            let elemento = Number(productosLS[i].precio * productosLS[i].cantidad) //variable para multiplicar precio*cantidad del producto en posición i(seleccionado)
            total = total + elemento;
        }
        igv = parseFloat(total*0.18).toFixed(2);
        subtotal = parseFloat(total-igv).toFixed(2);

        document.getElementById("subtotal").innerHTML = "S/. " + subtotal;
        document.getElementById("igv").innerHTML = "S/. " + igv;
        document.getElementById("total").value = "S/. " + total.toFixed(2);
    }

    //actualizar monto
    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
            
        }
        else {
            console.log("click afuera");
        }
    }
}