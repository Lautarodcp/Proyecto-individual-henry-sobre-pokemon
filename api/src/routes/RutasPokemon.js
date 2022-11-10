const { Router } = require('express');
const controlers = require('../controllers/Controllers');
const router = Router();

router.get('/', async (req, res) => {
	const { name } = req.query;
	try {
		const pokeInfo = await controlers.getAllPokemons();
		if (name) {
			const findPokemon = await controlers.getPokemonsName(name, pokeInfo);
			return res.json(findPokemon);
		}
		res.json(pokeInfo);
	} catch (error) {
		res.status(400).json(error.message);
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const pokeInfo = await controlers.getPokemonsId(id);
		res.json(pokeInfo);
	} catch (error) {
		console.log(error);
		res.status(400).send(error.message);
	}
});

router.post('/', async (req, res) => {
	const info = req.body;
	try {
		const pokeInfo = await controlers.pokeCreate(info);
		res.status(201).send(pokeInfo);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;