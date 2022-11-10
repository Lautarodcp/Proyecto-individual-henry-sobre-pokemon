const { Router } = require("express");
const controller = require("../controllers/controllers");
const router = Router();

router.get ("/", (req, res)=>{
    try {
        res.status(201).send("estoy en get de tipo");
    } catch (error) {
        res.status(400).send(error.message);
    }
} )

module.exports = router;