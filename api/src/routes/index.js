const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const rutasPokemon = require("./rutasPokemon");
const rutasTipo = require("./rutasTipo");

const router = Router();

router.use("/pokemons", rutasPokemon);
router.use("/types", rutasTipo);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
