const express = require('express');
const axios = require('axios');
const isUUID = require('is-uuid');
require('dotenv').config();
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');

const router = express.Router();

//GET /dogs with promises
// router.get('/', (req, res, next) => {
//     const { name } = req.query;
//     let apiDogsPromise = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
//     let dbDogsPromise = Dog.findAll({
//         include: {
//             model: Temperament,
//             attributes: ['name'],
//             through: {
//                 attributes: []
//             }
//         }
//     });
//     return Promise.all([apiDogsPromise, dbDogsPromise])
//         .then(resultados => {
//             let apiDogs = resultados[0].data;
//             //to get only the properties that I need
//             apiDogs = apiDogs.map(elem => {
//                 return {
//                     id: elem.id,
//                     image: elem.image.url,
//                     name: elem.name,
//                     temperament: elem.temperament
//                 }
//             });
//             //end
//             let dbDogs = resultados[1];
//             //to get only the properties that I need
//             dbDogs = dbDogs.map(elem => {
//                 return {
//                     id: elem.id,
//                     image: "",  //TODO
//                     name: elem.name,
//                     temperament: elem.temperaments.map(elem => elem.name).join(', ')    //.toString()
//                 }
//             });
//             //end
//             const allDogs = apiDogs.concat(dbDogs);
//             if (name) {
//                 const byName = allDogs.filter(elem => elem.name.toLowerCase().includes(name.toLocaleLowerCase()));
//                 byName.length ? 
//                     res.status(200).send(byName) :
//                     res.status(404).send("[GET /dogs] No results found.");                
//             } else {
//                 res.status(200).send(allDogs);
//             }
//         })
//         .catch(e => {
//             next({
//                 status: 418,
//                 message: "\nERROR :\\\nError in [GET /dogs] \n\nOriginal error message:\n" + e
//             });
//         });
// });

//GET /dogs with async await
router.get('/', async (req, res, next) => {
    const { name } = req.query;
    try {
        let apiDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        let dbDogs = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
        //to get only the properties that I need
        apiDogs = apiDogs.data.map(elem => {
            return {
                id: elem.id,
                image: elem.image.url,
                name: elem.name,
                temperament: elem.temperament,
                weight: elem.weight.metric
            }
        });
        //end
        //to get only the properties that I need
        dbDogs = dbDogs.map(elem => {
            return {
                id: elem.id,
                image: "",  //TODO
                name: elem.name,
                temperament: elem.temperaments.map(elem => elem.name).join(', '),    //.toString()
                weight: elem.weight
            }
        });
        //end
        const allDogs = apiDogs.concat(dbDogs);
        if (name) {
            const byName = allDogs.filter(elem => elem.name.toLowerCase().includes(name.toLocaleLowerCase()));
            byName.length ? 
                res.status(200).send(byName) :
                res.status(200).send([{error: 'No results found'}]);                
        } else {
            res.status(200).send(allDogs);
        }
    } catch(e) {
        next({
            status: 418,
            message: "\nERROR :\\\nError in [GET /dogs] \n\nOriginal error message:\n" + e
        });
    }
});

//GET /dogs/:id with promises
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!isUUID.v4(id)) {
        axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            .then(resultados => {
                let dogById = resultados.data.find(elem => elem.id === parseInt(id));    //filter()
                if (dogById) {
                    res.status(200).send({
                        image: dogById.image.url,
                        name: dogById.name,
                        temperament: dogById.temperament,
                        height: dogById.height.metric,
                        weight: dogById.weight.metric,
                        life_span: dogById.life_span
                    });
                } else {
                    res.status(404).send("[GET /dogs/:id] No results found.");
                }
            })
            .catch(e => {
                next({
                    status: 418,
                    message: "\nERROR :\\\nError in [GET /dogs/:id] \n\nOriginal error message:\n" + e
                });
            });
    } else {
        Dog.findAll({
            where: {
                id: id
            },
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
            .then(resultados => {
                let dogById = resultados.find(elem => elem.id === id);   //filter()
                if (dogById) {
                    res.status(200).send({
                        image: "",   //TODO
                        name: dogById.name,
                        temperament: dogById.temperaments.map(elem => elem.name).join(', '),    //.toString()
                        height: dogById.height,
                        weight: dogById.weight,
                        life_span: dogById.life_span
                    });
                } else {
                    res.status(404).send("[GET /dogs/:id] No results found.");
                }
            })
            .catch(e => {
                next({
                    status: 418,
                    message: "\nERROR :\\\nError in [GET /dogs/:id] \n\nOriginal error message:\n" + e
                });
            });        
    }
});

// //GET /dogs/:id with promises -> trying to refactor the code
// router.get('/:id', (req, res, next) => {
//     let { id } = req.params;
//     let myPromise;
//     if (!isUUID.v4(id)) {
//         myPromise = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
//     } else {
//         myPromise = Dog.findAll({
//             where: {
//                 id: id
//             },
//             include: {
//                 model: Temperament,
//                 attributes: ['name'],
//                 through: {
//                     attributes: []
//                 }
//             }
//         })
//     }
//     myPromise.then(resultados => {
//         if (!isUUID.v4(id)) {
//             resultados = resultados.data;
//             id = parseInt(id);
//         }
//         let dogById = resultados.find(elem => elem.id === id);  //filter()
//         console.log("dogbyId: " + dogbyId);
//         if (dogById) {
//             if (!isUUID.v4(id)) {
//                 let result = {
//                     image: dogById.image.url,
//                     name: dogById.name,
//                     temperament: dogById.temperament,
//                     height: dogById.height.metric,
//                     weight: dogById.weight.metric,  
//                 };
//             } else {
//                 let result = {
//                     image: "",
//                     name: dogById.name,
//                     temperament: dogById.temperaments.map(elem => elem.name).join(', '),    //.toString();,
//                     height: dogById.height,
//                     weight: dogById.weight,  
//                 };
//             }
//             res.status(200).send("result");
//         } else {
//             res.status(404).send("[GET /dogs/:id] No results found.");
//         }
//     })
//     .catch(e => {
//         next({
//             status: 418,
//             message: "\nERROR :\\\nError in [GET /dogs/:id] \n\nOriginal error message:\n" + e
//         });
//     });
// });

module.exports = router;