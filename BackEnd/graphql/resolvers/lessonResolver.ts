import Lesson from '../../models/lesson';
import { LessonInterface } from '../../Utils/interfaces/lessonsInterface';

export const getLessons = async () => {
  const res = await Lesson.find();
  console.log(res);
  return res;
};

export const getLesson = async (
  _: null,
  args: { title: string; chapter: number }
) => {
  const res = await Lesson.findOne({ title: args.title });
  const final: LessonInterface = res;
  final.chapters = [res.chapters[args.chapter - 1]];
  return final;
};

export const createLesson = async (_: null, args: any) => {
  console.log(args.chapter);
  const newLesson = new Lesson({
    title: args.title,
    thumbnail: args.thumbnail,
    chapters: args.chapters,
    teacher: args.teacherID,
  });
  const res = await newLesson.save();
  return res;
};
