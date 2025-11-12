import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
  dotenv.config({ path: envFile });
}

const useUnixSocket = process.env.DB_INSTANCE_NAME && process.env.DB_INSTANCE_NAME.startsWith('/cloudsql');

let poolConfig: PoolConfig;

if (useUnixSocket) {
  poolConfig = {
    host: process.env.DB_INSTANCE_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
} else {
  poolConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}

export const pool = new Pool(poolConfig);

(async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL successfully');
    client.release();
  } catch (err) {
    console.error('Error message:', err instanceof Error ? err.message : String(err));

  }
})();

pool.on('error', (err) => console.error('Unexpected pool error:', err));