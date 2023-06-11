import { Document } from 'mongoose';

export interface MessageInterface extends Document {
  id: string;
  data: object;
  created_at: Date;
}
