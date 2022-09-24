// iniciar usuario

class Usuario {
    constructor(nombre,contraseña,iniciado){
        this.nombre = nombre.toUpperCase();
        this.contraseña = contraseña;
        this.iniciado = iniciado;
    }
}
const usuarios = [];


const btnUsuario = document.querySelector('.ingresarUsuario');

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

        let name = document.querySelector('.usuario');
        name.textContent = nombre;
        let cerrarSesion = document.querySelector('.ingresarUsuario');
        cerrarSesion.innerHTML = 'Cerrar Sessión';
    }else if (check == false){
        let name = document.querySelector('.usuario');
        name.textContent = '';
        let cerrarSesion = document.querySelector('.ingresarUsuario');
        cerrarSesion.innerHTML = 'Iniciar Sesión';    
        usuarios.forEach(usuario =>{
            if (usuario.iniciado == true) {
            usuario.iniciado=false;
        }});
        
        check = true;
    };

    
});

const stocks = [
    {
        id: 1,
        nombre: 'Gorra Negra',
        precio: 200,
        img: '../assets/img/GorroN.jpg',
        talles: false
    },
    {
        id: 2,
        nombre: 'Gorra Verde',
        precio: 200,
        img: '../assets/img/GorroV.jpg',
        talles: false
    },
    {
        id: 3,
        nombre: 'Remera Gris',
        precio: 250,
        img: '../assets/img/RemeraG.jpg',
        talles: true
    },
    {
        id: 4,
        nombre: 'Canguro Gris',
        precio: 500,
        img: '../assets/img/CanguroG.jpg',
        talles: true
    },
    {
        id: 5,
        nombre: 'Remera Flag',
        precio: 300,
        img: '../assets/img/RemeraFlag.jpg',
        talles: true
    },
];






const stock = document.getElementById('mercaderia');

stocks.forEach(stoc =>{

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="card m-2" style="width: 18rem;">
            <img src="${stoc.img}" class="card-img-top">
            <div class="card-body">
                <h4 class="card-title">${stoc.nombre}</h4>
                <p class="card-text">Talles $${stoc.precio} .</p>
                <a href="#" class="btn btnForm">Comprar</a>
            </div>
        </div>
    `;
    stock.appendChild(div);
});