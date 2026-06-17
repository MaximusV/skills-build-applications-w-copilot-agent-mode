/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Workout from '../models/Workout';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Connecting to', MONGO_URL);
  await mongoose.connect(MONGO_URL);
  console.log('Connected to MongoDB for seeding');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({})
  ]);

  // Create users
  const [alice, bob, carol] = await User.create([
    { name: 'Alice Runner', email: 'alice@example.com' },
    { name: 'Bob Cyclist', email: 'bob@example.com' },
    { name: 'Carol Swimmer', email: 'carol@example.com' }
  ]);

  // Create teams
  const [alpha, beta] = await Team.create([
    { name: 'Team Alpha', members: [alice._id, bob._id] },
    { name: 'Team Beta', members: [carol._id] }
  ]);

  // Assign teams to users
  alice.team = alpha._id;
  bob.team = alpha._id;
  carol.team = beta._id;
  await alice.save();
  await bob.save();
  await carol.save();

  // Create workouts
  const [run, ride, swim] = await Workout.create([
    { name: '5km Run', description: 'Easy 5km run', durationMinutes: 30 },
    { name: '20km Ride', description: 'Steady ride', durationMinutes: 60 },
    { name: '1km Swim', description: 'Pool laps', durationMinutes: 25 }
  ]);

  // Create activities
  const activities = await Activity.create([
    { user: alice._id, team: alpha._id, workout: run._id, durationMinutes: 32, distanceKm: 5 },
    { user: bob._id, team: alpha._id, workout: ride._id, durationMinutes: 58, distanceKm: 20 },
    { user: carol._id, team: beta._id, workout: swim._id, durationMinutes: 26 }
  ]);

  // Create leaderboard entries (simple scoring)
  const leaderboard = await LeaderboardEntry.create([
    { user: alice._id, team: alpha._id, score: 95, rank: 1 },
    { user: bob._id, team: alpha._id, score: 88, rank: 2 },
    { user: carol._id, team: beta._id, score: 80, rank: 3 }
  ]);

  console.log('Seeding complete:');
  console.log({ users: [alice, bob, carol].map(u => u.email), teams: [alpha.name, beta.name] });

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
