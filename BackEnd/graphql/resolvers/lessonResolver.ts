import Lesson from '../../models/lesson';

export const getLessons = async () => {
  const res = await Lesson.find();
  return res;
};

export const getLesson = async (_: null, args: { title: string }) => {
  const res = await Lesson.find({ title: args.title });
  return res;
};
