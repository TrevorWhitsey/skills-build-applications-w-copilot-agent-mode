import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('rankings.team', 'name city')
      .sort({ weekOf: -1 })
      .lean();

    res.json({
      resource: 'leaderboard',
      count: leaderboard.length,
      data: leaderboard,
    });
  } catch (error) {
    res.status(500).json({ resource: 'leaderboard', message: 'Failed to fetch leaderboard', error });
  }
});

export default leaderboardRouter;