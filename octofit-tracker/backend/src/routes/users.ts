import { Router } from 'express';
import User from '../models/User';

const router = Router();

// GET /api/users/ - list users
router.get('/', async (req, res) => {
  const users = await User.find().populate('team').lean();
  res.json({ users });
});

// POST /api/users/ - create user
router.post('/', async (req, res) => {
  const payload = req.body;
  const user = await User.create(payload);
  res.status(201).json({ user });
});

export default router;
