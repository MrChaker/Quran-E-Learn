import mongoose, { Model } from 'mongoose';

export const LessonSchema = new mongoose.Schema(
  {
    title: String,
    chapters: [String],
  },
  {
    timestamps: true,
  }
);

const Lesson = mongoose.model<any, Model<any>>('Lesson', LessonSchema);
export default Lesson;
