// iniciar usuario
const d = document;

class Usuario {
    constructor(nombre,apellido){
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.iniciado = true;
    }
}
const usuarios = [];


const btnUsuario = d.querySelector('.ingresarUsuario');

btnUsuario.addEventListener('click', () => {
    let check = true;

    usuarios.forEach(usuario =>{
        usuario.iniciado && (check = false);
    });
    if (check) {
        const nombre1 = prompt('Ingrese Nombre de usuario: ');
        const apellido1 = prompt('Ingrese su apellido: ');
        const nuevoUsuario = new Usuario(nombre1,apellido1);
        const nuevoUsuario2 = {
            ...nuevoUsuario,
            contraseña: prompt('Ingrese Contraseña: '),
            email: prompt('Ingrese email: ')
        };

        console.log(nuevoUsuario2);
        usuarios.push(nuevoUsuario2);

        let name = d.querySelector('.usuario');
        const {nombre,apellido}=usuarios;
        name.textContent = nombre + '' + apellido;
        let cerrarSesion = d.querySelector('.ingresarUsuario');
        cerrarSesion.innerHTML = 'Cerrar Sessión';
    }else {
        let name = d.querySelector('.usuario');
        name.textContent = '';
        let cerrarSesion = d.querySelector('.ingresarUsuario');
        cerrarSesion.innerHTML = 'Iniciar Sesión';    
        usuarios.forEach(usuario =>{
            usuario.iniciado && (usuario.iniciado=false)
        });
        
        check = true;
    };

    
});





const carrito = [];

cargarStorage();


function cargarStorage(){
    if (localStorage.getItem('carritoStore')) {

        const storage = JSON.parse(localStorage.getItem('carritoStore'));
        storage.forEach((p) =>{
            carrito.push(p);
        });
        precioFinal();
    }
    
};


function renderProductos(){

    const stock = d.getElementById('mercaderia');

    BBDD.forEach((p) =>{
        const {img,nombre,precio,id}=p;
        let producto = d.createElement('div');
        producto.classList.add('col-12','col-md-3','mb-5', 'd-flex','justify-content-center');

        producto.innerHTML = `
            <div class="card m-2" style="width: 18rem;">
                <img src="${img}" class="card-img-top">
                <div class="card-body">
                    <h4 class="card-title">${nombre}</h4>
                    <p class="card-text">Talles $${precio} .</p>
                    <button class="btn btnForm " id= "${id}">Añadir al carrito</button>
                </div>
            </div>
        `;
        stock.appendChild(producto);

        producto.querySelector('button').addEventListener('click', ()=>{
        
            agregarCompraCarrito(id);
            
        })
    })
    
    renderCarrito();
};

renderProductos();

function renderCarrito(){

    let carritoHTML = d.querySelector('#carrito');
    
    carritoHTML.innerHTML='';

    const storage = JSON.parse(localStorage.getItem('carritoStore'));
    if (localStorage?.getItem('carritoStore') || false) {
        storage.forEach((p , index)=>{
            let producto = d.createElement('div');
            producto.classList.add('card');
            producto.innerHTML = `
                <div class="card p-1" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${p.img}" class="img-fluid rounded-start">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h4 class="card-title">${p.nombre}</h4>
                                <p class="card-text">Precio $${p.precio}</p>
                                <p class="card-text">Cantidad ${p.cantidad}</p>
                                <button class="btn btnForm" id= "${p.id}">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            producto.querySelector('button').addEventListener('click',()=>{

                eliminarProductoCarrito(index);

            });

            carritoHTML.appendChild(producto);
        });
    }}

function agregarCompraCarrito(id){


    let producto = BBDD.find(producto => producto.id === id);
    
    let productosEnCarrito = carrito.find(producto => producto.id === id);
    console.log(producto);
    
    if (productosEnCarrito) {
        
        productosEnCarrito.cantidad++;

    }else{
        producto.cantidad = 1
        carrito.push(producto);
    }

    guardarCarritoLocalStorage();
    renderCarrito();
    precioFinal();
    
};



function eliminarProductoCarrito(indice){

    carrito[indice].cantidad--;

    carrito[indice].cantidad === 0 && carrito.splice(indice,1);

    guardarCarritoLocalStorage();
    renderCarrito(); 
    precioFinal();
}

function precioFinal(){

    let precioFinal = 0;
    let cantidadArticulos = 0;
    
    carrito.forEach((p)=>{
        const {precio,cantidad}= p;
        precioFinal += precio * cantidad;
        cantidadArticulos += cantidad;
    });
    const pagar = d.getElementById('totalPagar');
    pagar.innerHTML=`<h4>C/Articulos: ${cantidadArticulos} Total: $${precioFinal}</h4>`;
}

function guardarCarritoLocalStorage(){
    localStorage.setItem('carritoStore',JSON.stringify(carrito));
};


