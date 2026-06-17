import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry';

const router = Router();

// GET /api/leaderboard/ - leaderboard summary
router.get('/', async (req, res) => {
  const entries = await LeaderboardEntry.find().populate('user team').sort({ score: -1 }).lean();
  res.json({ leaderboard: entries });
});

export default router;
