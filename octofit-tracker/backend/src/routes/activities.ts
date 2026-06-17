import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

// GET /api/activities/ - list activities
router.get('/', async (req, res) => {
  const activities = await Activity.find().populate('user team workout').lean();
  res.json({ activities });
});

// POST /api/activities/ - log activity
router.post('/', async (req, res) => {
  const payload = req.body;
  const activity = await Activity.create(payload);
  res.status(201).json({ activity });
});

export default router;
