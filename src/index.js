import express from 'express';
import parser from 'body-parser';
import cors from 'cors';

import task3C from './task-3C';

const app = express();

app.use(express.static('public'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());

app.get('/', (req, res) => res.redirect('/task-3C'));

app.use('/task-3C', task3C);

app.listen(3000, () => console.log('listening 3000'));
