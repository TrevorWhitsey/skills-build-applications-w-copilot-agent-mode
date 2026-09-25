import { Schema, model, Types } from 'mongoose';

interface IRankingEntry {
  team: Types.ObjectId;
  points: number;
  rank: number;
}

export interface ILeaderboard {
  weekOf: Date;
  rankings: IRankingEntry[];
}

const rankingEntrySchema = new Schema<IRankingEntry>(
  {
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    weekOf: { type: Date, required: true, unique: true },
    rankings: { type: [rankingEntrySchema], default: [] },
  },
  { timestamps: true }
);

const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema);

export default Leaderboard;