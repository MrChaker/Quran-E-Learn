import Request from '../../models/requests';
import { RequestType } from '../types';
import cloudinary from 'cloudinary';
import Teacher from '../../models/teacher';
import User from '../../models/user';

export const getRequests = async () => {
  const requests = await Request.find().populate('user');
  return requests;
};

export const getRequest = async (_: null, args: { _id: string }) => {
  const request = await Request.findById(args._id).populate('user');
  return request;
};

export const createRequest = async (_: null, args: RequestType) => {
  const newReq = new Request({
    user: args.userID,
    message: args.message,
    cv: args.cv,
  });

  const res = await newReq.save();
  return res;
};

export const handleRequest = async (
  _: null,
  args: {
    _id: string;
    accepted: boolean;
    userID?: string;
  }
) => {
  /* const state = args.accepted ? 'Accepted' : 'Declined';
  const req = await Request.findByIdAndUpdate(args._id, { state }); */

  if (args.accepted) {
    await User.findByIdAndUpdate(args.userID, { 'roles.teacher': true })
      .then(async (doc) => {
        const newTeacher = new Teacher({
          parentID: doc.id,
          name: doc.name,
          email: doc.email,
          phone: doc.phone,
          image: doc.image,
          roles: {
            student: true,
            teacher: true,
            admin: false,
          },
        });
        await newTeacher.save();
      })
      .catch((err) => console.log(err));
  }
  await Request.findByIdAndDelete(args._id);

  return 'done';
};
