import express from 'express';
import parser from 'body-parser';
import cors from 'cors';

import task3B from './task-3B';

const app = express();

app.use(express.static('public'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());

app.get('/', (req, res) => res.redirect('/task-3B'));

app.use('/task-3B', task3B);

app.listen(3000, () => console.log('listening 3000'));
