import { pool } from './config/database';

async function testConnection(): Promise<void> {
  try {
    const result = await pool.query('SELECT * FROM public.polls ');
    console.log('Conexión exitosa a PostgreSQL');
    console.log('Hora del servidor:', result.rows[0].title);
  } catch (error) {
    console.error('Error al conectar con la base de datos:');
    console.error(error);
  } finally {
    await pool.end();
  }
}

testConnection();
    