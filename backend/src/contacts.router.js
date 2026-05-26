import { Router } from 'express';
import { pool } from './db.js';

const router = Router();

// Listar todos
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener uno
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM contacts WHERE id = $1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear
router.post('/', async (req, res) => {
  const { name, email, phone, address } = req.body;
  if (!name) return res.status(400).json({ error: 'El nombre es requerido' });
  try {
    const { rows } = await pool.query(
      `INSERT INTO contacts (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, phone, address]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar
router.put('/:id', async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE contacts SET name=$1, email=$2, phone=$3, address=$4 WHERE id=$5 RETURNING *`,
      [name, email, phone, address, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar
router.delete('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('DELETE FROM contacts WHERE id=$1 RETURNING *', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Eliminado', contact: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;