import express from 'express';
import _ from 'lodash';

const router = express.Router();
const blackBox = require('./data/black-box.json');

// router.use(async (req, res, next) => {
//   const data = await pets.getData();
//   req.pets = data.pets;
//   req.users = data.users;
//   next();
// });

router.get('*', (req, res) => {
    const ID = req.query.i;
    const ERROR = 'Invalid id';
    if (typeof ID === 'undefined') {
      console.log('Undefined id param');
      res.send(ERROR);
      return;
    }

    blackBox.actions.forEach(function (item, i, arr) {
      if(item.q === ID) {
        res.send(item.a);
        return;
      }

    });

    res.send(ID);
  });

router.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(404);
});

export default router;
