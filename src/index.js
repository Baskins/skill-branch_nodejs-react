import express from 'express';
import parser from 'body-parser';
import cors from 'cors';

import task2X from './task-2X';

const app = express();

app.use(express.static('public'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());

app.get('/', (req, res) => res.redirect('/task-2X'));

app.use('/task-2X', task2X);

app.listen(3000, () => console.log('listening 3000'));
