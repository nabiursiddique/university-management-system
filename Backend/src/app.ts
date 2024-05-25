import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
import router from './app/routes';

export const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

// not found route
app.use(notFoundRoute);

// error handling for whole project
app.use(globalErrorHandler);

// server route
app.get('/', (req: Request, res: Response) => {
  res.send('welcome to university management system');
});
