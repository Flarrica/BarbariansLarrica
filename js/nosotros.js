const jugadores = [
    {
        id: 1,
        numero: 38,
        nombre: 'Fernando Larrica',
        posicion: 'CT/NT/FB/LB/QB',
        img: '../assets/img/FernandoLarrica.jpg'
    },
    {
        id: 2,
        numero: 06,
        nombre: 'Fabian Hernandez',
        posicion: 'SS',
        img: '../assets/img/MVP4.jpg'
    },
    {
        id: 3,
        numero: 85,
        nombre: 'Gabriel Sanchez',
        posicion: 'WR',
        img: '../assets/img/MVP3.jpeg'
    },
    {
        id: 4,
        numero: 26,
        nombre: 'Luciano Guillen',
        posicion: 'RB',
        img: '../assets/img/MVP1.jpg'
    },
    {
        id: 5,
        numero: 02,
        nombre: 'Luciano Guillen',
        posicion: 'RB',
        img: '../assets/img/MVP2.jpg'
    },
    {
        id: 6,
        numero: 01,
        nombre: 'Felipe Poggio',
        posicion: 'Head Coach',
        img: '../assets/img/HeadCouch.jpg'
    },
];
const jugadoresMVP = [

    {
        id: 1,
        numero: 06,
        nombre: 'Fabian Hernandez',
        posicion: 'SS',
        img: '../assets/img/MVP4.jpg'
    },
    {
        id: 2,
        numero: 85,
        nombre: 'Gabriel Sanchez',
        posicion: 'WR',
        img: '../assets/img/MVP3.jpeg'
    },
    {
        id: 3,
        numero: 26,
        nombre: 'Luciano Guillen',
        posicion: 'RB',
        img: '../assets/img/MVP1.jpg'
    },
];
const trofeos = [
    {
        id: 1,
        nombre: 'Trofeo 2019',
        img: '../assets/img/trofeo2019.jpeg'
    },
    {
        id: 3,
        nombre: 'Trofeo 2018 en memoria de "Daniel Bilche"',
        img: '../assets/img/trofeoDAnielBilche.jpeg'
    },
    {
        id: 4,
        nombre: 'Trofeo 2018<',
        img: '../assets/img/trofeoApertura2018.jpeg'
    },
    {
        id: 5,
        nombre: 'Trofeo Clausura 2016',
        img: '../assets/img/trofeoClausura2016.jpeg'
    },
];

const cards = document.getElementById('tarjetas');

jugadores.forEach(jugador =>{

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div data-aos="fade-up" class="card border-success m-2" style="width: 18rem;">
            <img src="${jugador.img}" class="card-img-top">
                <div class="card-body">
                    <p class="card-text">${jugador.numero} - ${jugador.nombre}</p>
                    <p class="card-text">${jugador.posicion}</p>
                </div>
        </div>
    `;
    cards.appendChild(div);
});