import mongoose from 'mongoose';

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

LessonSchema.pre('remove', function (next) {
  this.chapters.forEach(async (chapter: any) => {
    await GFS.findByIdAndDelete(chapter.video);
  });
  next();
});

const Lesson = mongoose.model<any, mongoose.Model<any>>('Lesson', LessonSchema);
export default Lesson;
