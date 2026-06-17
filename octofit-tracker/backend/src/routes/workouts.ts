import { Router } from 'express';

const router = Router();

// GET /api/workouts/ - list workouts
router.get('/', (req, res) => {
  res.json({ workouts: [] });
});

// POST /api/workouts/ - create workout (placeholder)
router.post('/', (req, res) => {
  const payload = req.body;
  res.status(201).json({ workout: payload });
});

export default router;
