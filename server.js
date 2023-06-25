import express from 'express';
import morgan from 'morgan';
import {env} from './env.js';
import { connection } from './src/db/database.js';


const app = express();
const port = env.PORT || 4000;

// Middleware
app.use(morgan('dev'));

//Routes

import toDoRouter from './src/routes/toDo.routes.js';
import statusRouter from './src/routes/status.routes.js';

app.use('/tasks', toDoRouter);
app.use('/status', statusRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
  connection();
});