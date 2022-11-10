const { Pokemon, Tipo } = require ("../db.js");
const axios = require ("axios");

const urlPokemon = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";

//pokemon
//get buscar todos en API
const getPokemonApi = async () => {
	try {
		const pokemonApiUrl = await axios.get(urlPokemon);
		const arrayPromise = await pokemonApiUrl?.data.results.map((element) => {
			return axios.get(element.url);
		});
		const promiseData = await Promise.all(arrayPromise);
		const pokeInfo = promiseData?.map((element) => element.data);
		let pokedex = 0;
		const pokeInfoFiltered = pokeInfo?.map((element) => {
			return {
				id: element.id,
				name: element.name,
				pokedex: ++pokedex,
				hp: element.stats[0].base_stat,
				attack: element.stats[1].base_stat,
				defense: element.stats[2].base_stat,
				speed: element.stats[5].base_stat,
				height: element.height,
				weight: element.weight,
				img: element.sprites.other.home.front_default,
				imgShiny: element.sprites.other.home.front_shiny,
				types: element.types.map((element) => element.type.name),
			};
		});
		return pokeInfoFiltered;
	} catch (error) {
		console.log(error, 'getPokemonsApi');
	}
};

//buscar todos en base de datos
const getPokemonBD = async ()=>{
const pokemonBD = await Pokemon.findAll();
    return pokemonBD;
}
// juntar todos los pokemon
const getPokemonAll = async ()=>{
    const pokemonBD = await getPokemonBD();
    const pokemonApi = await getPokemonApi();
    const allPokemon = [...pokemonApi, ...pokemonBD];
    return allPokemon;
}
//get buscar por id
const getPokemonId = async (id)=>{
    const todosLosPokemon = await getPokemonAll();
    const buscar = todosLosPokemon.find((pokemon) => pokemon.id.toString() === id);
    if (!buscar) throw new Error (`El pokemon con id ${id} no se encontro`);

    return buscar;
};
//get buscar por nombre
const getPokemonName = async (nombre)=>{
    const todosoLosPokemon = await getPokemonAll();
    const encontrado = todosoLosPokemon.find((pokemon) => { return (
        pokemon.name.toLowerCase() === nombre.toLowerCase()
        );
    });
    console.log(encontrado);
    if (!encontrado) throw new Error (`No se encontro pokemon con el nombre ${nombre}`);
    return encontrado;
};
//post crear pokemon
const postCreatePokemon = async (body)=>{
    const { nombre, vida, ataque, defensa, velocidad, altura, peso, imagen, tipo } = body;
    
    if (!nombre, !tipo) throw new Error ("Faltan datos");
   
    const allPokemon = await getPokemonAll();
    const buscarCoincidencia = allPokemon.find((pokemon) => pokemon.nombre.toLowerCase()=== nombre.toLOwerCase());
    
    if (buscarCoincidencia) throw new Error (`No se puede crear el pokemon ${nombre}, ya existe un pokemon con ese nombre`);
    let tipoPokemon = await Tipo.create({tipoPokemon: tipo.toLowerCase()});
    let pokemonNuevo = await Pokemon.create({
        nombre: nombre.toLowerCase(),
        vida: parseInt(vida),
        ataque: parseInt(ataque),
        defensa: parseInt(defensa),
        velocidad: parseInt(velocidad),
        altura: parseInt(altura),
        peso: parseInt(peso),
        imagen: imagen?imagen: "https://www.viniloscasa.com/38276-thickbox/vinilo-pikachu-pokemon.jpg",
    });
    return pokemonNuevo;
};
//get buscar tipos de pokemon
const getTipos = ()=>{
};

module.exports = {
    getPokemonApi,
    getPokemonId,
    getPokemonName,
    postCreatePokemon,
    getTipos,
    getPokemonBD,
    getPokemonAll
};
