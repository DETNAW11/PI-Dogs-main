const express = require('express');
const { Temperament } = require('../db');

const router = express.Router();

//GET /temperament with promises
// router.get('/', (req, res) => {
//     Temperament.findAll()
//         .then(resultados => {
//             var result = resultados.map(elem => {
//                 return {
//                     id: elem.id,
//                     name: elem.name
//                 }
//             });
//             res.status(200).send(result);
//         })
//         .catch(e => {
//             next({
//                 status: 418,
//                 message: "\nERROR :\\\nError in [GET /temperament] \n\nOriginal error message:\n" + e
//             });
//         });
// });

//GET /temperament with async await
router.get('/', async (req, res) => {
    try {
        let temperaments = await Temperament.findAll();
        let result = temperaments.map(elem => {
            return {
                // id: elem.id,
                name: elem.name
             }
        });
        res.status(200).send(result.sort(function(a, b) {
            if(a.name > b.name) {
                return 1;
            }
            if(b.name > a.name) {
                return -1;
            }
            return 0;
        }));
    } catch(e) {
        next({
            status: 418,
            message: "\nERROR :\\\nError in [GET /temperament] \n\nOriginal error message:\n" + e
        });
    };
});

module.exports = router;