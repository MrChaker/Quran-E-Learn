import mongoose from 'mongoose';
import User from './user';

const MeetingSchema = new mongoose.Schema({
  title: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  date: Date,
});

export const Meeting = mongoose.model<any>('Meeting', MeetingSchema);
