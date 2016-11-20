import express from 'express';

const app = express();
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://account.skill-branch.ru');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);

app.get('/', (req, res) => {
  res.redirect('/task-2D');
});

// Клиент выполняет GET запрос с параметром Query: ?color= и присылает цвета в разных форматах.
// Задача: привести все цвета к виду HEX виду в нижнем регистре: #123abc.
// В случае если в color находится некорректный цвет, Invalid color
app.get('/task-2D', function (req, res) {
    const COLOR = req.query.color;
    const ERROR = 'Invalid color';
    if (typeof COLOR === 'undefined') {
      console.log('Undefined param');
      res.send(ERROR);
      return;
    }

    const _COLOR = COLOR.trim();
    if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(_COLOR)) {
      console.log('Incorrect param');
      res.send(ERROR);
      return;
    }

    var color = '#';
    if (/^[0-9a-fA-F]{3}$/.test(_COLOR)) {
      let i;
      for (i = 0; i < 3; i++) {
        color = color + _COLOR.charAt(i) + _COLOR.charAt(i);
      }
    } else {
      color = color + _COLOR;
    }

    res.send(color.toLowerCase());
  });

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
