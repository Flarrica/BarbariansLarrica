const d= document;

const formularios = d.getElementById('formulario');

formularios.addEventListener('submit',(e) =>{
    
    e.preventDefault();
    const nombre = d.getElementById('nombre').value;
    const apellido = d.getElementById('apellido').value;
    const telefono = d.getElementById('telefono').value;
    const numeroDeDocumento = d.getElementById('documento2').value;
    const email = d.getElementById('mail').value;
    const textArea = d.getElementById('text-area').value;

    const datos ={
        nombre,
        apellido,
        telefono,
        numeroDeDocumento,
        email, 
        textArea
    }
    formularios.reset();
});