import Lesson from '../../models/lesson';

export const getLessons = async () => {
  const res = await Lesson.find();
  console.log(res);
  return res;
};

export const getLesson = async (_: null, args: { title: string }) => {
  const res = await Lesson.findOne({ title: args.title });
  return res;
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
