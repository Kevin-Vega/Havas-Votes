import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/polls.routes';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

const app = express();
const port = process.env.PORT || 3001;


app.use(express.json());

app.use('/api/v1/test', authRoutes);

app.listen(Number(port), () => {
  console.log(`[${process.env.NODE_ENV || 'development'}] Server running on port ${port}`);
});
