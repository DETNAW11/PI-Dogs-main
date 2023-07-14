const express = require('express');
const { Dog, Temperament } = require('../db');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { name, height, weight, life_span, temperament } = req.body;
    try {
        const dogCreated = await Dog.create({ name, height, weight, life_span });
        const temperaments = await Temperament.findAll({
            where: {
                name: temperament
            }
        });
        dogCreated.addTemperament(temperaments);
        res.status(200).send("Dog's breed created successfully.");
    } catch(e) {
        next({
            status: 418,
            message: "\nERROR :\\\nError in [POST /dog] \n\nOriginal error message:\n" + e
        });
    }
});

module.exports = router;