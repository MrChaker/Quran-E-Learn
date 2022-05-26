import Lesson from '../../models/lesson';
import User from '../../models/user';
import { UserInterface } from '../../../interfaces/userInterface';

//queries
export const getUser = async (_: null, args: { _id: string }) => {
  const user = await User.findById(args._id);
  return user;
};

const handleRoleQuery = (queryFromArgs: UserInterface) => {
  let roles = {};
  if (queryFromArgs.roles?.student != undefined) {
    roles = Object.assign({}, roles, {
      'roles.student': queryFromArgs.roles.student,
    });
  }
  if (queryFromArgs.roles?.teacher != undefined) {
    roles = Object.assign({}, roles, {
      'roles.teacher': queryFromArgs.roles.teacher,
    });
  }
  if (queryFromArgs.roles?.admin != undefined) {
    roles = Object.assign({}, roles, {
      'roles.admin': queryFromArgs.roles.admin,
    });
  }
  delete queryFromArgs.roles;

  return Object.assign({}, queryFromArgs, roles);
};
export const getUsers = async (_: null, args: { query: UserInterface }) => {
  const users = await User.find(handleRoleQuery(args.query));

  return users;
};
export const getCount = async () => {
  const result: { students: number; teachers: number; lessons: number } = {
    students: await User.countDocuments({
      'roles.student': true,
      'roles.teacher': false,
    }),
    teachers: await User.countDocuments({ 'roles.teacher': true }),
    lessons: await Lesson.countDocuments(),
  };
  return result;
};

//mutation
export const updateUser = async (
  _: null,
  args: { _id: string; query: UserInterface }
) => {
  const res = await User.findByIdAndUpdate(
    args._id,
    handleRoleQuery(args.query)
  );
  return res;
};

export const deleteUser = async (_: null, args: { _id: String }) => {
  const res = await User.findById(args._id);
  res.remove();
  return res;
};

export const joinTeacher = async (
  _: null,
  args: { teacherID: string; studentID: string }
) => {
  try {
    const student = await User.findById(args.studentID);

    if (student.teachers.length > 2) throw new Error('max reached');
    const teacher = await User.findById(args.teacherID);

    if (teacher.students.includes(args.studentID)) {
      throw new Error('already in');
    } else {
      teacher.students.push(args.studentID);
      teacher.save();
    }
    student.teachers.push(args.teacherID);
    if (teacher.lessons.length > 0) {
      teacher.lessons.forEach((lesson: any) => {
        student.Slessons.push({ lesson, progress: 0 });
      });
    }

    await student.save();
    return { message: 'done' };
  } catch (error) {
    console.log(error);
    return { message: error };
  }
};
//**image requires extra work
/* export const updateImage = async (_: null, args: ImageArgs) => {
  await cloudinary.v2.uploader.destroy(args.user_id);

  const result = await cloudinary.v2.uploader.upload(args.file, {
    public_id: `${args.user_id}`,
    folder: 'Quran/',
    invalidate: true,
    faces: true,
  });

  await User.findByIdAndUpdate(args.user_id, {
    image: result.secure_url,
  }).catch((err) => console.log(err));
  return result.secure_url;
};
 */
