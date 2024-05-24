import express, { Request, Response } from 'express';
import cors from 'cors';

export const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('welcome to university management system');
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
  next();
});
