import express from 'express';
import _ from 'lodash';
import URL from 'url-parse';
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
  res.redirect('/task-2C');
});

// Верезать из строки вида `telegram.me/skillbranch` username `skillbranch`
app.get('/task-2C', function (req, res) {
    const USERNAME = req.query.username;
    const ERROR = 'Invalid username';
    if (typeof USERNAME === 'undefined') {
      console.log('Undefined param');
      res.send(ERROR);
      return;
    }

    var username = '@';
    const userPattern = XRegExp('^@?[\\p{L}]+$', 'i');
    if (USERNAME.match(userPattern)) {
      username += _.trim(USERNAME, '@');
    } else {
      const url = new URL(USERNAME, undefined, true);
      const domainPattern = XRegExp('[\\p{L}]+\\.[\\p{L}]{2,3}', 'i');
      if (domainPattern.test(url.pathname) && url.slashes === false) {
        url.pathname = url.pathname.split('/')[1];
      }

      const PATHNAME = _.trim(url.pathname, '/@').split('/')[0];
      username = username + PATHNAME;
    }

    res.send(username);
  });

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
