import mongoose from 'mongoose';
import User from './user';

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
      ref: User,
    },
  },
  {
    timestamps: true,
  }
);

LessonSchema.pre('remove', async function (next) {
  try {
    this.chapters.forEach(async (chapter: any) => {
      await GFS.findByIdAndDelete(chapter.video);
    });
    const teacher = await User.findByIdAndUpdate(this.teacher, {
      $pull: { lessons: this._id },
    });
    const students = await User.updateMany(
      { Slessons: this._id },
      {
        $pull: { Slessons: this._id },
      }
    );
  } catch (error) {
    console.log(error);
  }
  next();
});

const Lesson = mongoose.model<any, mongoose.Model<any>>('Lesson', LessonSchema);
export default Lesson;
