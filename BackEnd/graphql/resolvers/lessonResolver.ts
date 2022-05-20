import Lesson from '../../models/lesson';
import { LessonInterface } from '../../../interfaces/lessonsInterface';
import User from '../../models/user';

export const getLessons = async (
  _: null,
  args: { userID?: string; forTeacher?: boolean }
) => {
  if (args.userID) {
    // if we want to get lessons related to a user ( created by 'teacher' forTeacher :true or getting studied by 'student' forTeacher: false)
    const res = await User.findById(args.userID, {
      Slessons: 1,
      lessons: 1,
    });
    const lessons: LessonInterface[] = [];
    const teacherOrStudent = args.forTeacher
      ? [...res.lessons]
      : [...res.Slessons];
    teacherOrStudent.forEach((l: any) => {
      lessons.push(args.forTeacher ? l : l.lesson);
    });
    const lessonsRes = await Lesson.find({ _id: { $in: lessons } }).populate(
      'teacher'
    );
    return lessonsRes;
  }

  const lessons = await Lesson.find().populate('teacher', { name: 1 });
  return lessons;
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

export const getChapters = async (_: null, args: { title: string }) => {
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
  // push it to teacher lessons
  const teacher = await User.findById(args.teacherID).populate('students');
  console.log(teacher);
  teacher.lessons.push(res.id);
  teacher.students.forEach((student: any) => {
    student.Slessons.push(res.id);
  });
  teacher.save();
  // put lesson to students db

  return res;
};

export const deleteLesson = async (_: null, args: { title: string }) => {
  const res = await Lesson.findOne({ title: args.title });
  res.remove();
  return res;
};
