import { Router } from 'express';

const router = Router();

// GET /api/leaderboard/ - leaderboard summary
router.get('/', (req, res) => {
  res.json({ leaderboard: [] });
});

export default router;
