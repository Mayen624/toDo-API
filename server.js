import express from 'express';
import morgan from 'morgan';
import {env} from './env.js';
import cors from 'cors';
import helmet from "helmet";
import BodyParser from 'body-parser';
import { connection } from './src/db/database.js';


const app = express();
const port = env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(BodyParser.urlencoded({extended: false}));

//Routes

import dataRouter from './src/routes/data.routes.js';

app.use('/api/v1', dataRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
  connection();
});