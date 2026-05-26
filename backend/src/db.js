import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(100) NOT NULL,
      email      VARCHAR(150),
      phone      VARCHAR(30),
      address    TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log(' Tabla contacts lista');
}