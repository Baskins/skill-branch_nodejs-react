import express from 'express';
import _ from 'lodash';
import XRegExp from 'xregexp';

const app = express();
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://account.skill-branch.ru');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);

app.get('/', (req, res) => {
  res.redirect('/task-2B');
});

// решение от коллеги https://bitbucket.org/Grey2k/skb-2.git
app.get('/task-2B', function (req, res) {
    var ERROR = 'Invalid fullname';
    if (typeof req.query.fullname === 'undefined') {
      console.log('Undefined param', XRegExp);
      res.send(ERROR);
      return;
    }

    var fullname = _.trim(req.query.fullname);
    var pattern = XRegExp("^\\s*([\\p{L}']+)\\s*([\\p{L}']+)?\\s*([\\p{L}']+)?\\s*$", 'i');
    if (!pattern.test(fullname)) {
      console.log('Bad format = ', fullname);
      res.send(ERROR);
      return;
    }

    var matches = _.filter(fullname.match(pattern).slice(1), function (match) {
        return typeof match !== 'undefined';
      });

    var fio = Array();
    switch (matches.length) {
      case 1:
        fio.push(matches[0].charAt(0).toUpperCase() + matches[0].slice(1).toLowerCase());
        break;
      case 2:
        fio.push(matches[1].charAt(0).toUpperCase() + matches[1].slice(1).toLowerCase());
        fio.push(matches[0].charAt(0).toUpperCase() + '.');
        break;
      case 3:
        fio.push(matches[2].charAt(0).toUpperCase() + matches[2].slice(1).toLowerCase());
        fio.push(matches[0].charAt(0).toUpperCase() + '.');
        fio.push(matches[1].charAt(0).toUpperCase() + '.');
        break;
      default:
        res.send(ERROR);
        return;
    }
    res.send(fio.join(' '));
  });

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
