const { Router } = require("express");
const { getPokemonAll, getPokemonId, getPokemonName, postCreatePokemon, getTipos} = require("../controllers/controllers");
const router = Router();
const { Pokemon, Tipo } = require("../db")

router.get("/", async (req, res) =>{
    const { nombre } = req.query;
    try {
        const todosPokemon = await getPokemonAll();
        if (nombre) {
                const buscarPokemon = await getPokemonName(nombre);
                return res.json(buscarPokemon);
        }
        res.json(todosPokemon);
    } catch (error) {
        res.status(400).json(error.message);
    };
});

router.get("/:id", async (req, res) =>{
    const pokemon = await getPokemonAll();
    const { id } = req.params;
    try {
        if (id) {
            const buscarId = await getPokemonId(id);
            res.status(201).send (buscarId);
        };  
    } catch (error) {
        res.status(400).send(error.message);
    };
});

router.post("/", async (req, res) => {
    const info = req.body;
    try {
        const pokemonNuevo = await postCreatePokemon(info);
        res.status(201).send(pokemonNuevo);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;