import { Router } from 'express';
import Activity from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name level')
      .populate('team', 'name city')
      .sort({ performedAt: -1 })
      .lean();

    res.json({
      resource: 'activities',
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({ resource: 'activities', message: 'Failed to fetch activities', error });
  }
});

export default activitiesRouter;