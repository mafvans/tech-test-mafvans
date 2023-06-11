import { Schema } from 'mongoose';

export const messageSchema = new Schema({
  id: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  // eslint-disable-next-line @typescript-eslint/camelcase
  created_at: { type: Date, default: Date.now },
});
