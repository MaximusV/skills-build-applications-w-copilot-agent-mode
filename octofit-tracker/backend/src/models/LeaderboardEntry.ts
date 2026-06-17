import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user?: mongoose.Types.ObjectId;
  team?: mongoose.Types.ObjectId;
  score: number;
  rank?: number;
}

const LeaderboardSchema: Schema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  score: { type: Number, required: true },
  rank: { type: Number }
});

export default mongoose.model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardSchema);
