const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 10;
let offset = 0;
const maxRocords = 251;
// const maxRocords = PokeApi.getLimit();

function loadPokemonItens(offset, limit) {
    PokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons.map(pokemon =>
                `<li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>`).join('')
            pokemonList.innerHTML += newHtml
            details(pokemons)
        })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsNextPage = offset + limit;
    if(qtdRecordsNextPage >= maxRocords){
        const newLimit = maxRocords - offset;
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else {
        loadPokemonItens(offset, limit)
    }
})

function details(pokemons){
    let list = document.querySelectorAll('li.pokemon')

    list.forEach((items, index) => {
        items.addEventListener('click', () => {
            window.location.assign += "/" + (index + 1)
            // window.location.reload(false)
        });
    })
}