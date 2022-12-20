import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('TS + Express server');
});

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
