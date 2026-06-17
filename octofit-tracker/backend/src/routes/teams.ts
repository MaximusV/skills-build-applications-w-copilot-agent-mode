import { Router } from 'express';

const router = Router();

// GET /api/teams/ - list teams
router.get('/', (req, res) => {
  res.json({ teams: [] });
});

// POST /api/teams/ - create team (placeholder)
router.post('/', (req, res) => {
  const payload = req.body;
  res.status(201).json({ team: payload });
});

export default router;
