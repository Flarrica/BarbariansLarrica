
async function integrantes(){
    const cards = document.getElementById('tarjetas');
    const response = await fetch('../js/json/jugadores.json');
    const data = await response.json();

    data.forEach( jugador =>{

        let div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <div data-aos="fade-up" class="card border-success m-2 aos-init aos-animate" style="width: 18rem;">
                <img src="${jugador.img}" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text">${jugador.numero} - ${jugador.nombre}</p>
                        <p class="card-text">${jugador.posicion}</p>
                    </div>
            </div>
        `;
        cards.appendChild(div);
});
};
integrantes();