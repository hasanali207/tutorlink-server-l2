import cors from 'cors';
import express, { Application } from 'express';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandle';

const app: Application = express();

app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:3000'], // allow multiple origins
  credentials: true, // allow cookies, authorization headers, etc.
};

// Apply CORS with options
app.use(cors(corsOptions));
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Welcome to tutor link ');
});

app.use(globalErrorHandler);

export const App = app;
