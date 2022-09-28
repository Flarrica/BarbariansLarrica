const cards = document.getElementById('partidos');

partidos.forEach(partido =>{

    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('my-2');
    div.style['width'] = '25rem';
    div.innerHTML = `

        <iframe class="embed-responsive-item" src="${partido.src}" allowfullscreen></iframe>
        <div class="card-body">
            <h4 class="card-title">${partido.nombre}</h4>
        </div>
        </div>
    `;
    cards.appendChild(div);
});