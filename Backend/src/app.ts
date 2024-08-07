import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
import router from './app/routes';
import cookieParser from 'cookie-parser';

export const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// application routes
app.use('/api/v1', router);

// testing route
const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};
app.get('/', test);

// not found route
app.use(notFoundRoute);

// error handling for whole project
app.use(globalErrorHandler);

// server route
app.get('/', (req: Request, res: Response) => {
  res.send('welcome to university management system');
});
