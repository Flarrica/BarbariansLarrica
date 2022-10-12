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

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        
        Toast.fire({
            icon: 'success',
            title: `${nombre1} has iniciado sesión`
        });

        let name = d.querySelector('.usuario');
        const {nombre,apellido}=usuarios;
        name.textContent = nombre + '' + apellido;
        let cerrarSesion = d.querySelector('.ingresarUsuario');
        cerrarSesion.innerHTML = 'Cerrar Sessión';
    }else {
        let name = d.querySelector('.usuario');

        Swal.fire({
            title: 'Estas seguro de cerrar sesión?',
            text: "No te pierdas nuestros productos!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            confirmButtonText: '#ffffff',
            cancelButtonColor: '#ff0000',
            confirmButtonText: 'Si, cerrar!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                'Cerraste sesión!',
                'Nos vemos pronto.',
                'success'
                );
                name.textContent = '';
                let cerrarSesion = d.querySelector('.ingresarUsuario');
                cerrarSesion.innerHTML = 'Iniciar Sesión';    
                usuarios.forEach(usuario =>{
                    usuario.iniciado && (usuario.iniciado=false)
        });
            }else{
                
            }
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
    fetch('../js/BBDD.json')
        .then((response)=> response.json())
        .then((data)=>{
            data.forEach((p) =>{
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
            
                    Toastify({
                        text: `Se ha agregado ${nombre} al carrito!`,
                        duration: 1000,
                        gravity: 'bottom',
                        position: 'right',
                        style:{
                            background: '#ffffff',
                            color: '#008000',
                            border: '2px solid #008000'
                        }

                    }).showToast();

                    agregarCompraCarrito(id);
            
                })
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
    if (carrito[indice].cantidad === 0) {
        Swal.fire({
            title: 'Esta seguro de eliminarlo?',
            text: `Se borrará del carrito ${carrito[indice].nombre}!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito.splice(indice,1);
                guardarCarritoLocalStorage();
                renderCarrito(); 
                precioFinal();
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado del carrito!',
                    showConfirmButton: false,
                    timer: 1000
                })
            }else {
                carrito[indice].cantidad++;
                guardarCarritoLocalStorage();
                renderCarrito(); 
                precioFinal();
            }
        })
    }
    

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


