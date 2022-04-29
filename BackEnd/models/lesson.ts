import mongoose, { Model } from 'mongoose';

export const GFS = mongoose.model(
  'GFS',
  new mongoose.Schema({}, { strict: false }),
  'uploads.files'
);
export const LessonSchema = new mongoose.Schema(
  {
    title: String,
    chapters: [
      {
        name: String,
        content: String,
        video: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'GFS',
        },
      },
    ],
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
