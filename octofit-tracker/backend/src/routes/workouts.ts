import { Router } from 'express';
import Workout from '../models/Workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find()
      .populate('recommendedFor', 'name level')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      resource: 'workouts',
      count: workouts.length,
      data: workouts,
    });
  } catch (error) {
    res.status(500).json({ resource: 'workouts', message: 'Failed to fetch workouts', error });
  }
});

export default workoutsRouter;