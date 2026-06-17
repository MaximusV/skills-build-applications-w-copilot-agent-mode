import mongoose from 'mongoose';

const DEFAULT_URL = 'mongodb://localhost:27017/octofit_db';

export function getMongoUrl(): string {
  return process.env.MONGO_URL || DEFAULT_URL;
}

export async function connectDB(): Promise<typeof mongoose> {
  const url = getMongoUrl();
  await mongoose.connect(url);
  return mongoose;
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
}

export default connectDB;
