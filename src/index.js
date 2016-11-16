import express from 'express';
const PC = require('./data/pc.json');

const app = express();
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://account.skill-branch.ru');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);

app.get('/', (req, res) => {
  res.redirect('/task-3A');
});

app.get('/task-3A', function (req, res) {
    res.json(PC);
  });

app.get('/task-3A/:id1?/:id2?/:id3?', function (req, res) {
      const id1 = req.params.id1;
      const id2 = req.params.id2;
      const id3 = req.params.id3;
      var CODE = 200;

      if (id1 === 'volumes') { // volumes, подсчитывает, сколько места на каком диске находится

        //пример
        var result = {
          "C:": "41943040B",
          "D:": "16777216B"
        };

      } else if (typeof id2 == 'undefined' && typeof id3 == 'undefined') {
        var result = PC[id1];
      } else if (typeof id3 == 'undefined') {
        var result = PC[id1][id2];
      } else {
        var result = PC[id1][id2][id3];
      }

      if (!result && result != 0) {
        var CODE = 404;
        var result = 'Not Found';
      }

      res.status(CODE);
      res.json(result);

    });

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
