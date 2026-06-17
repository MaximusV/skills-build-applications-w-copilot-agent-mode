import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

// GET /api/teams/ - list teams
router.get('/', async (req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json({ teams });
});

// POST /api/teams/ - create team
router.post('/', async (req, res) => {
  const payload = req.body;
  const team = await Team.create(payload);
  res.status(201).json({ team });
});

export default router;
