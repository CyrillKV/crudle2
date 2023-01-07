import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routes/auth';
import postsRouter from './routes/posts';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postsRouter);
app.use('/auth', authRouter);

mongoose.connect(`${process.env.MONGO_URI}`)
  .then(() => app.listen(port, () => console.log(`Server is running on port ${port}`)))
  .catch((err) => err.message);
