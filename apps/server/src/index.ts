import express from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:8081'],
    credentials: true,
  }),
);

app.all('/api/auth/**', toNodeHandler(auth));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
