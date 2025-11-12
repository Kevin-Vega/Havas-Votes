import express from 'express';
import dotenv from 'dotenv';

import pollsRoutes from './routes/polls.routes';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
}

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/v1', pollsRoutes);

app.listen(Number(port), () => {
  console.log(`[${process.env.NODE_ENV || 'development'}] Server running on port ${port}`);
});
