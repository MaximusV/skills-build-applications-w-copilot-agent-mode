import express, { Express } from 'express';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

export function createServer(): Express {
  const app = express();

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

  return app;
}

/**
 * Construct Codespaces-aware public URL when running inside GitHub Codespaces.
 * Checks for CODESPACE_NAME environment variable and builds the preview URL.
 * e.g 8000.app.github.dev
 */
export function getCodespacesUrl(port: number): string | null {
  const name = process.env.CODESPACE_NAME;
  if (!name) return null;
  // GitHub Codespaces preview URL pattern
  return `https://${name}-${port}.app.github.dev`;
}

export function startServer(app: Express, port: number): void {
  const codespaceUrl = getCodespacesUrl(port);
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    if (codespaceUrl) {
      console.log(`Codespaces preview URL: ${codespaceUrl}`);
    }
  });
}
