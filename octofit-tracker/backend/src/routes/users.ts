import { Router } from 'express';
import User from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  try {
    const users = await User.find().populate('team', 'name city').lean();

    res.json({
      resource: 'users',
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ resource: 'users', message: 'Failed to fetch users', error });
  }
});

export default usersRouter;