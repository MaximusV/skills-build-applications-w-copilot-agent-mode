import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

// GET /api/workouts/ - list workouts
router.get('/', async (req, res) => {
  const workouts = await Workout.find().lean();
  res.json({ workouts });
});

// POST /api/workouts/ - create workout
router.post('/', async (req, res) => {
  const payload = req.body;
  const workout = await Workout.create(payload);
  res.status(201).json({ workout });
});

export default router;
