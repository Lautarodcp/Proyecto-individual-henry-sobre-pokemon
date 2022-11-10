const axios = require('axios');
const { Pokemon, Type } = require('../db');

const urlPokemon = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

const getPokemonsApi = async () => {
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

const getPokemonDb = async () => {
	const pokeInfoDb = await Pokemon.findAll({
		include: {
			model: Type,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});
	return pokeInfoDb;
};

const getAllPokemons = async () => {
	const apiInfo = await getPokemonsApi();
	const dbInfo = await getPokemonDb();
	const allInfo = [...apiInfo, ...dbInfo];
	return allInfo;
};

const getPokemonsName = async (name, info) => {
	let pokemonFind;
	if (name.length === 1) {
		pokemonFind = info?.filter(
			(pokemon) => pokemon.name.toLowerCase()[0] === name.toLowerCase()
		);
	} else {
		pokemonFind = info?.filter((pokemon) =>
			pokemon.name.includes(name.toLowerCase())
		);
	}

	if (!pokemonFind.length) {
		throw new Error(`No se encontró un pokemon con el nombre ${name}`);
	}
	return pokemonFind;
};

const getPokemonsId = async (id) => {
	const pokeInfo = await getAllPokemons();
	const findPokemon = pokeInfo?.find((pokemon) => pokemon.id.toString() === id);
	if (!findPokemon)
		throw new Error(`El pokemon con id ${id} no fue encontrado`);

	return findPokemon;
};

const typesInDb = async () => {
	try {
		const apiTypes = await axios.get('https://pokeapi.co/api/v2/type');
		const pokeInfo = await apiTypes.data.results.map((type) => {
			return {
				name: type.name,
			};
		});
		pokeInfo.forEach((pokemonType) => {
			Type.findOrCreate({
				where: pokemonType,
			});
		});
	} catch (error) {
		console.log(error, 'typesInDb');
	}
};
const getTypes = async () => {
	const dbTypes = await Type.findAll();
	if (!dbTypes.length) throw new Error(`No se encontraros tipos`);
	return dbTypes;
};

const pokeCheckName = async (name) => {
	const allPokemons = await getAllPokemons();
	const pokemonFind = allPokemons?.find(
		(pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
	);
	if (pokemonFind)
		throw new Error(
			`No se pueden crear el pokemon ${name} debido a que ya existe un pokemon con ese nombre`
		);
};

let pokedex = 1155;

const pokeCreate = async (body) => {
	const { name, hp, attack, defense, speed, height, weight, img, type } = body;
	if ((!name, !hp, !type.length)) throw new Error('Faltan datos');

	await pokeCheckName(name);

	let newPokemon = await Pokemon.create({
		name: name.toLowerCase(),
		pokedex: pokedex++,
		hp: parseInt(hp) || null,
		attack: parseInt(attack) || null,
		defense: parseInt(defense) || null,
		speed: parseInt(speed) || null,
		height: parseInt(height) || null,
		weight: parseInt(weight) || null,
		img: img
			? img
			: 'https://assets.pokemon.com/static2/_ui/img/og-default-image.jpeg',
	});

	const pokeType = await Type.findAll({
		where: {
			name: type,
		},
	});

	let typesDb;
	if (type.length === 2) {
		if (pokeType[0].dataValues.name !== type[0]) {
			typesDb = [pokeType[0], pokeType[1]] = [pokeType[1], pokeType[0]];
		} else {
			typesDb = pokeType;
		}
	} else {
		typesDb = pokeType;
	}

	await newPokemon.addType(typesDb);

	return await Pokemon.findByPk(newPokemon.id, {
		include: {
			model: Type,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});
};

module.exports = {
	getAllPokemons,
	getPokemonsId,
	getPokemonsName,
	typesInDb,
	getTypes,
	pokeCreate,
};
