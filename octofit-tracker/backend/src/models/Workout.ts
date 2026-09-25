import { Schema, model, Types } from 'mongoose';

export interface IWorkout {
  title: string;
  focus: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  equipment: string[];
  tags: string[];
  recommendedFor: Types.ObjectId[];
  createdBy: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    equipment: [{ type: String, trim: true }],
    tags: [{ type: String, trim: true }],
    recommendedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Workout = model<IWorkout>('Workout', workoutSchema);

export default Workout;