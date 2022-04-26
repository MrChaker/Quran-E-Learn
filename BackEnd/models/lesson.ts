import mongoose, { Model } from 'mongoose';

export const LessonSchema = new mongoose.Schema(
  {
    title: String,
    chapters: [String],
    thumbnail: String,
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = mongoose.model<any, Model<any>>('Lesson', LessonSchema);
export default Lesson;
