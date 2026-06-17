import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description?: string;
  durationMinutes?: number;
}

const WorkoutSchema: Schema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String },
  durationMinutes: { type: Number }
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
