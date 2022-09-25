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

const BBDD = [
    {
        id: 1,
        nombre: 'Gorra Negra',
        precio: 200,
        img: '../assets/img/GorroN.jpg',
        cantidad: 0,
        talles: false
    },
    {
        id: 2,
        nombre: 'Gorra Verde',
        precio: 200,
        img: '../assets/img/GorroV.jpg',
        cantidad: 0,
        talles: false
    },
    {
        id: 3,
        nombre: 'Remera Gris',
        precio: 250,
        img: '../assets/img/RemeraG.jpg',
        cantidad: 0,
        talles: true
    },
    {
        id: 4,
        nombre: 'Canguro Gris',
        precio: 500,
        img: '../assets/img/CanguroG.jpg',
        cantidad: 0,
        talles: true
    },
    {
        id: 5,
        nombre: 'Remera Flag',
        precio: 300,
        img: '../assets/img/RemeraFlag.jpg',
        cantidad: 0,
        talles: true
    },
];



const carrito = [];

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
                    <button class="btn btnForm" id= "${p.id}">Añadir al carrito</button>
                </div>
            </div>
        `;
        stock.appendChild(producto);

        producto.querySelector('button').addEventListener('click', ()=>{
        
            agregarCompraCarrito(p.id);
            
        })
    })
};

renderProductos();

function agregarCompraCarrito(id){

    let producto = BBDD.find(producto => producto.id === id);

    let productosEnCarrito = carrito.find(producto => producto.id === id);

    if (productosEnCarrito) {
        
        productosEnCarrito.cantidad++;

    }else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    renderCarrito();
    precioFinal();
};

function renderCarrito(){

    let carritoHTML = d.querySelector('#carrito');
    
    carritoHTML.innerHTML='';

    carrito.forEach((p , index)=>{
        let producto = d.createElement('div');
        producto.classList.add('card');
        producto.innerHTML = `
            <div class="card m-2" style="width: 18rem;">
                <img src="${p.img}" class="card-img-top">
                <div class="card-body">
                    <h4 class="card-title">${p.nombre}</h4>
                    <p class="card-text">Talles $${p.precio}</p>
                    <p class="card-text">Cantidad ${p.cantidad}</p>
                    <button class="btn btnForm" id= "${p.id}">Eliminar</button>
                </div>
            </div>
        `;

        producto.querySelector('button').addEventListener('click',()=>{

            eliminarProductoCarrito(index);

        });

        carritoHTML.appendChild(producto);

    })

}

function eliminarProductoCarrito(indice){

    carrito[indice].cantidad--;

    if (carrito[indice].cantidad === 0) {

        carrito.splice(indice,1);
        
    };

    renderCarrito();
    precioFinal();
}

function precioFinal(){

    let precioFinal = 0;
    carrito.forEach((p)=>{

        precioFinal += p.precio * p.cantidad;

    });
    const pagar = d.getElementById('totalPagar');
    pagar.innerHTML=`<h4>Total a Pagar: $${precioFinal}</h4>`;
}