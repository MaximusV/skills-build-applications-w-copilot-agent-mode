import connectDB from './config/database';
import { createServer, startServer } from './server';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

async function main() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    const app = createServer();
    startServer(app, PORT);
  } catch (err) {
    console.error('Error starting application:', err);
    process.exit(1);
  }
}

main();
