import User from '../../models/user';
import { UserUpdateArgs } from '../types';
import { UserInterface } from '../../Utils/interfaces/userInterface';

//queries
export const getUser = async (_: null, args: { _id: string }) => {
  const user = await User.findById(args._id);
  return user;
};

export const getCount = async () => {
  const result: { students: number; teachers: number } = {
    students: await User.countDocuments({
      'roles.student': true,
      'roles.teacher': false,
    }),
    teachers: await User.countDocuments({ 'roles.teacher': true }),
  };
  return result;
};

//mutation
export const updateUser = async (_: null, args: UserUpdateArgs) => {
  const res = await User.findByIdAndUpdate(args._id, args.query);
  return res;
};

export const deleteUser = async (_: null, args: { _id: String }) => {
  const res = await User.findByIdAndDelete(args._id);
  return res;
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
