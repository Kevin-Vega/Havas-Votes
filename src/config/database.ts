import { Pool } from 'pg';
import dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

(async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL successfully');
    client.release();
  } catch (err) {
    console.error('Failed to connect to PostgreSQL:', err instanceof Error ? err.message : String(err));
  }
})();

pool.on('error', (err) => console.error('Unexpected pool error:', err));