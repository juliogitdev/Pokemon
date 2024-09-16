let inputPokemon = document.querySelector('#search')
const initial_audio = new Audio('sounds/whos-that-pokemon_.mp3')
const plink_audio = new Audio('sounds/plink.mp3')

async function getPokemon (pokemon) {
    let apiPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    let dataPokemon = await apiPokemon.json()
    let pokemonName = dataPokemon.name
    let pokemonImg = dataPokemon.sprites.other.dream_world.front_default
    let pokemonId = dataPokemon.id
    return {
        name: pokemonName,img: pokemonImg,id: pokemonId
    }
}

async function setPokemon(pokemon) {
    let pokemonData = await getPokemon(pokemon)
    
    let name = document.querySelector('#name')
    let id = document.querySelector('#id')
    let img = document.querySelector('#img')
    inputPokemon.placeholder = pokemonData.name
    name.innerHTML = pokemonData.name
    id.innerHTML = pokemonData.id
    img.src = pokemonData.img
    
}

function mudarPokemon(direction){
    plink_audio.currentTime = 0
    plink_audio.play()
    let id = document.querySelector("#id")
    if(direction == 0 && id.innerHTML > 1){
        setPokemon(id.innerHTML - 1)
        return
    }
    setPokemon(Number(id.innerHTML) + 1)
}
window.addEventListener('load', ()=>{
    initial_audio.currentTime = 0
    initial_audio.play()
    setPokemon(1)
})

inputPokemon.addEventListener('input', (value)=>{
    setPokemon(inputPokemon.value.toLowerCase())
})
