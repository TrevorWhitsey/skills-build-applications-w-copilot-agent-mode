import { Router } from 'express';
import Team from '../models/Team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members', 'name level totalPoints').lean();

    res.json({
      resource: 'teams',
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    res.status(500).json({ resource: 'teams', message: 'Failed to fetch teams', error });
  }
});

export default teamsRouter;