import express from 'express';
import cors from 'cors';
import queryParser from 'express-query-int';

const app = express();
app.use(cors());
app.use(queryParser({
  parser: parseFloat,
}));
app.get('/', (req, res) => {
  res.redirect('/task-2A');
});

app.get('/task-2A', (req, res) => {
  let summa = (req.query.a || 0) + (req.query.b || 0);
  summa = summa.toString();
  res.send(summa);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
