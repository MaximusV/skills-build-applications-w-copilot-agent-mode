import { Router } from 'express';

const router = Router();

// GET /api/activities/ - list activities
router.get('/', (req, res) => {
  res.json({ activities: [] });
});

// POST /api/activities/ - log activity (placeholder)
router.post('/', (req, res) => {
  const payload = req.body;
  res.status(201).json({ activity: payload });
});

export default router;
