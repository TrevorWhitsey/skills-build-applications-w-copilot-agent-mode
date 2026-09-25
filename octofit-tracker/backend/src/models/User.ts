import { Schema, model, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  weeklyGoal: number;
  totalPoints: number;
  team?: Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    weeklyGoal: { type: Number, required: true, min: 1 },
    totalPoints: { type: Number, required: true, min: 0, default: 0 },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);

export default User;