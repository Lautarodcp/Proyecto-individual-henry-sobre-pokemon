const { Router } = require('express');
const { getTypes } = require('../controllers/Controllers');
const router = Router();

router.get('/', async (req, res) => {
	try {
		const pokeTypes = await getTypes();
		res.json(pokeTypes);
	} catch (error) {
		res.status(400).json(error.message);
	}
});

module.exports = router;
