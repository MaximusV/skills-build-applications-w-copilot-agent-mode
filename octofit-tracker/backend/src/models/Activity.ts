import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  team?: mongoose.Types.ObjectId;
  workout?: mongoose.Types.ObjectId;
  durationMinutes?: number;
  distanceKm?: number;
  timestamp: Date;
}

const ActivitySchema: Schema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  workout: { type: Schema.Types.ObjectId, ref: 'Workout' },
  durationMinutes: { type: Number },
  distanceKm: { type: Number },
  timestamp: { type: Date, default: () => new Date() }
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
