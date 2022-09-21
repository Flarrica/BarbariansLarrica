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