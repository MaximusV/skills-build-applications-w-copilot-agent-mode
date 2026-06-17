import express from 'express';
import connectDB from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

app.use(express.json());

// API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend running' });
});

// Construct Codespaces-aware public URL when running inside Codespaces
function codespacesUrl(port: number) {
  const name = process.env.CODESPACE_NAME;
  if (!name) return null;
  // GitHub Codespaces preview URL pattern
  return `https://${name}-${port}.app.github.dev`;
}

connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      const external = codespacesUrl(PORT);
      if (external) {
        console.log(`Codespaces preview URL: ${external}`);
      }
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
