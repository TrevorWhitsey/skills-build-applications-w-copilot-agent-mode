import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [runnersGuild, ironWolves] = await Team.create([
      {
        name: 'Runners Guild',
        city: 'Seattle',
        motto: 'Miles before excuses',
        totalPoints: 0,
        members: [],
      },
      {
        name: 'Iron Wolves',
        city: 'Austin',
        motto: 'Stronger every session',
        totalPoints: 0,
        members: [],
      },
    ]);

    const users = await User.create([
      {
        name: 'Avery Chen',
        email: 'avery.chen@octofit.dev',
        level: 'intermediate',
        weeklyGoal: 5,
        totalPoints: 420,
        team: runnersGuild._id,
      },
      {
        name: 'Mateo Singh',
        email: 'mateo.singh@octofit.dev',
        level: 'advanced',
        weeklyGoal: 6,
        totalPoints: 515,
        team: runnersGuild._id,
      },
      {
        name: 'Noah Patel',
        email: 'noah.patel@octofit.dev',
        level: 'beginner',
        weeklyGoal: 3,
        totalPoints: 260,
        team: ironWolves._id,
      },
      {
        name: 'Lina Romero',
        email: 'lina.romero@octofit.dev',
        level: 'advanced',
        weeklyGoal: 6,
        totalPoints: 540,
        team: ironWolves._id,
      },
    ]);

    const teamPoints = {
      runnersGuild: users[0].totalPoints + users[1].totalPoints,
      ironWolves: users[2].totalPoints + users[3].totalPoints,
    };

    await Team.findByIdAndUpdate(runnersGuild._id, {
      members: [users[0]._id, users[1]._id],
      totalPoints: teamPoints.runnersGuild,
    });

    await Team.findByIdAndUpdate(ironWolves._id, {
      members: [users[2]._id, users[3]._id],
      totalPoints: teamPoints.ironWolves,
    });

    await Activity.create([
      {
        user: users[0]._id,
        team: runnersGuild._id,
        type: 'Tempo Run',
        durationMinutes: 42,
        distanceKm: 8.4,
        calories: 520,
        intensity: 'high',
        performedAt: new Date('2026-09-20T07:30:00.000Z'),
      },
      {
        user: users[1]._id,
        team: runnersGuild._id,
        type: 'Hill Intervals',
        durationMinutes: 36,
        distanceKm: 6.1,
        calories: 470,
        intensity: 'high',
        performedAt: new Date('2026-09-21T18:00:00.000Z'),
      },
      {
        user: users[2]._id,
        team: ironWolves._id,
        type: 'Cycling Endurance',
        durationMinutes: 55,
        distanceKm: 21.7,
        calories: 610,
        intensity: 'moderate',
        performedAt: new Date('2026-09-22T06:45:00.000Z'),
      },
      {
        user: users[3]._id,
        team: ironWolves._id,
        type: 'Strength Circuit',
        durationMinutes: 48,
        distanceKm: 0,
        calories: 430,
        intensity: 'high',
        performedAt: new Date('2026-09-23T17:20:00.000Z'),
      },
      {
        user: users[0]._id,
        team: runnersGuild._id,
        type: 'Recovery Jog',
        durationMinutes: 28,
        distanceKm: 4.6,
        calories: 280,
        intensity: 'low',
        performedAt: new Date('2026-09-24T08:10:00.000Z'),
      },
    ]);

    const sortedRankings = [
      { team: runnersGuild._id, points: teamPoints.runnersGuild },
      { team: ironWolves._id, points: teamPoints.ironWolves },
    ].sort((a, b) => b.points - a.points);

    await Leaderboard.create({
      weekOf: new Date('2026-09-21T00:00:00.000Z'),
      rankings: sortedRankings.map((entry, index) => ({
        team: entry.team,
        points: entry.points,
        rank: index + 1,
      })),
    });

    await Workout.create([
      {
        title: 'Weekend 10K Builder',
        focus: 'Aerobic endurance',
        difficulty: 'intermediate',
        durationMinutes: 50,
        equipment: ['Running shoes', 'GPS watch'],
        tags: ['running', 'endurance', 'cardio'],
        recommendedFor: [users[0]._id, users[1]._id],
        createdBy: 'coach-bot',
      },
      {
        title: 'Core and Mobility Reset',
        focus: 'Core stability and mobility',
        difficulty: 'beginner',
        durationMinutes: 30,
        equipment: ['Yoga mat', 'Resistance band'],
        tags: ['mobility', 'core', 'recovery'],
        recommendedFor: [users[2]._id],
        createdBy: 'coach-bot',
      },
      {
        title: 'Full-Body Power Ladder',
        focus: 'Explosive strength',
        difficulty: 'advanced',
        durationMinutes: 45,
        equipment: ['Dumbbells', 'Plyo box'],
        tags: ['strength', 'power', 'conditioning'],
        recommendedFor: [users[3]._id],
        createdBy: 'coach-bot',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
