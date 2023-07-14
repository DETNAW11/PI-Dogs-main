//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const axios = require('axios');
const server = require('./src/app.js');
const { conn, Temperament } = require('./src/db.js');
require('dotenv').config();
const { API_KEY } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  const apiDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  const temperaments = apiDogs.data.map(elem => elem.temperament);
  var temperamentsInArray = [];
  for (var i=0; i<temperaments.length; i++) {
    if (temperaments[i]) {  //because same breeds have the temperament set to undefined!
      temperamentsInArray = temperamentsInArray.concat(temperaments[i].split(', '));
    }
  }
  temperamentsInArray.forEach(elem => {
    Temperament.findOrCreate({
        where: {
            name: elem
        }
    })
  });
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
}).catch(e => console.log('ERROR :( ' + e));
