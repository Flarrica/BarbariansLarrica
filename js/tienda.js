// iniciar usuario
const d = document;

class Usuario {
    constructor(nombre,contraseña,iniciado){
        this.nombre = nombre.toUpperCase();
        this.contraseña = contraseña;
        this.iniciado = iniciado;
    }
}
const usuarios = [];


const btnUsuario = d.querySelector('.ingresarUsuario');

btnUsuario.addEventListener('click', () => {
    let check = true;

    usuarios.forEach(usuario =>{
        if (usuario.iniciado == true) {
            check=false;
        }
    });
    if (check) {
        const nombre = prompt('Ingrese Nombre de usuario: ');
        const contraseña = prompt('Ingrese contraseña: ');
        const nuevoUsuario = new Usuario(nombre,contraseña,true);
        usuarios.push(nuevoUsuario);

        console.log(usuarios);

        let name = d.querySelector('.usuario');
        name.textContent = nombre;
        let cerrarSesion = d.querySelector('.ingresarUsuario');
        cerrarSesion.innerHTML = 'Cerrar Sessión';
    }else if (check == false){
        let name = d.querySelector('.usuario');
        name.textContent = '';
        let cerrarSesion = d.querySelector('.ingresarUsuario');
        cerrarSesion.innerHTML = 'Iniciar Sesión';    
        usuarios.forEach(usuario =>{
            if (usuario.iniciado == true) {
            usuario.iniciado=false;
        }});
        
        check = true;
    };

    
});





const carrito = [];
cargarStorage();


function cargarStorage(){

    const storage = JSON.parse(localStorage.getItem('carritoStore'));
    storage.forEach((p) =>{
        carrito.push(p);
    });
    precioFinal();
};


function renderProductos(){

    const stock = d.getElementById('mercaderia');

    BBDD.forEach((p) =>{

        let producto = d.createElement('div');
        producto.classList.add('col-12','col-md-3','mb-5', 'd-flex','justify-content-center');

        producto.innerHTML = `
            <div class="card m-2" style="width: 18rem;">
                <img src="${p.img}" class="card-img-top">
                <div class="card-body">
                    <h4 class="card-title">${p.nombre}</h4>
                    <p class="card-text">Talles $${p.precio} .</p>
                    <button class="btn btnForm " id= "${p.id}">Añadir al carrito</button>
                </div>
            </div>
        `;
        stock.appendChild(producto);

        producto.querySelector('button').addEventListener('click', ()=>{
        
            agregarCompraCarrito(p.id);
            
        })
    })
    
    renderCarrito();
};

renderProductos();

function renderCarrito(){

    let carritoHTML = d.querySelector('#carrito');
    
    carritoHTML.innerHTML='';

    const storage = JSON.parse(localStorage.getItem('carritoStore'));

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
}

function agregarCompraCarrito(id){


    let producto = BBDD.find(producto => producto.id === id);
    
    let productosEnCarrito = carrito.find(producto => producto.id === id);
    console.log(producto);
    if (productosEnCarrito) {
        
        productosEnCarrito.cantidad++;

    }else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    guardarCarritoLocalStorage();
    renderCarrito();
    precioFinal();
    
};



function eliminarProductoCarrito(indice){

    carrito[indice].cantidad--;

    if (carrito[indice].cantidad === 0) {

        carrito.splice(indice,1);
        
    };

    guardarCarritoLocalStorage();
    renderCarrito(); 
    precioFinal();
}

function precioFinal(){

    let precioFinal = 0;
    let cantidadArticulos = 0;
    carrito.forEach((p)=>{

        precioFinal += p.precio * p.cantidad;
        cantidadArticulos += p.cantidad;

    });
    const pagar = d.getElementById('totalPagar');
    pagar.innerHTML=`<h4>C. Articulos: ${cantidadArticulos} Total a Pagar: $${precioFinal}</h4>`;
}

function guardarCarritoLocalStorage(){
    localStorage.setItem('carritoStore',JSON.stringify(carrito));
};
