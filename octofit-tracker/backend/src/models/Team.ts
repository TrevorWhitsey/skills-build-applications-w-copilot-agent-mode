import { Schema, model, Types } from 'mongoose';

export interface ITeam {
  name: string;
  city: string;
  motto: string;
  totalPoints: number;
  members: Types.ObjectId[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    totalPoints: { type: Number, required: true, min: 0, default: 0 },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Team = model<ITeam>('Team', teamSchema);

export default Team;