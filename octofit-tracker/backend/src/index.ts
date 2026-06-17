import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit';

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend running' });
});

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
