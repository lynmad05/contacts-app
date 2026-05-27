import express from 'express';
import cors from 'cors';
import { initDB } from './db.js';
import contactsRouter from './contacts.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/contacts', contactsRouter);

app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

async function start() {
  // Reintentar conexión a DB hasta que esté lista
  let retries = 10;
  while (retries > 0) {
    try {
      await initDB();
      break;
    } catch (err) {
      retries--;
      console.log(`⏳ Esperando DB... (${retries} intentos restantes)`);
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 API corriendo en http://localhost:${PORT}`);
  });
}

start();