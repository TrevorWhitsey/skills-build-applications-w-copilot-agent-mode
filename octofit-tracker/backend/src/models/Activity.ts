import { Schema, model, Types } from 'mongoose';

export interface IActivity {
  user: Types.ObjectId;
  team: Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm: number;
  calories: number;
  intensity: 'low' | 'moderate' | 'high';
  performedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, required: true, min: 0 },
    calories: { type: Number, required: true, min: 1 },
    intensity: { type: String, enum: ['low', 'moderate', 'high'], required: true },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const Activity = model<IActivity>('Activity', activitySchema);

export default Activity;