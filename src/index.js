import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.redirect('/task-2B');
});

app.get('/task-2B', (req, res) => {
  // Перевести полное `Имя Отчество Фамилия` в `Фамилия И. О.`
  const fullName = req.query.fullname;
  const arr = fullName.split(' ');

  if (arr.length > 3 || fullName === '' || /[0-9_,|'"]|\/|\*/gi.test(fullName)) {
    var result = 'Invalid fullname';

  } else if (arr.length > 2) {

    var name = arr[0];
    if (typeof name === 'undefined') {
      var name = '';
    } else {
      var name = name.charAt(0) + '.';
    }

    var middlename = arr[1];
    if (typeof middlename === 'undefined') {
      var middlename = '';
    } else {
      var middlename = middlename.charAt(0) + '.';
    }

    var surname = arr[2];
    if (typeof surname === 'undefined') {
      var surname = '';
    }

    var result = `${surname} ${name} ${middlename}`;

  } else if (arr.length > 1) {

    var name = arr[0];
    if (typeof name === 'undefined') {
      var name = '';
    } else {
      var name = name.charAt(0) + '.';
    }

    var surname = arr[1];
    if (typeof surname === 'undefined') {
      var surname = '';
    }

    var result = `${surname} ${name}`;

  } else {

    var surname = arr[0];
    if (typeof surname === 'undefined') {
      var surname = '';
    }

    var result = `${surname}`;
  }

  res.send(result);

});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
