import { Router } from 'express';

const router = Router();

// GET /api/users/ - list users
router.get('/', (req, res) => {
  res.json({ users: [] });
});

// POST /api/users/ - create user (placeholder)
router.post('/', (req, res) => {
  const payload = req.body;
  res.status(201).json({ user: payload });
});

export default router;
