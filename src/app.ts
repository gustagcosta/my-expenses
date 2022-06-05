import './helpers/dotenv';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { errorHandler, notFound } from './middlewares/error';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);
app.get('/', (req, res) => {
  console.log(process.env);
  res.send({ ok: 'cool' });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
