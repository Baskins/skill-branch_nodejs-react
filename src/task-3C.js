import express from 'express';
import _ from 'lodash';

const router = express.Router();
const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/?limit=1000000';

// скачал из АПИ  и записал в локальный файл
const pokeAll = require('./data/pokemonsOld.json');

// оптимизированный джончик
// const pokeAll = require('./data/pokemons.json');

router.get('/', (req, res) => {
    // const ID = req.query.i;
    // const ERROR = 'Invalid id';
    // if (typeof ID === 'undefined') {
    //   console.log('Undefined id param');
    //   res.send(ERROR);
    //   return;
    // }

    // сортируем выборку
    const pokeSort = pokeAll.sort();

    // ограничиваем выборку
    const poker = pokeSort.slice(0, 20);
    res.send(_.map(poker, 'name'));

  });

router.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(404);
});

// сортировка по ID
function sortByKey(key) {
  return function compare(a,b) {return a[key] < b[key]? -1: a[key] > b[key]? 1: a.name < b.name? -1: a.name > b.name? 1: 0}
}

// сортировка по Имени
function sortByName(a,b) {return a < b? -1: a > b? 1: 0}

export default router;
