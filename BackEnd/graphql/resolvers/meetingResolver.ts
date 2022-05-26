import { Meeting } from '../../models/meeting';
import { MeetingArgs } from '../types';

export const getMeetings = async (_: null, args: { teacherID: string }) => {
  const res = await Meeting.find({ teacher: args.teacherID }).populate(
    'teacher'
  );
  console.log(res);
  return res;
};
export const getMeeting = async (_: null, args: { _id: string }) => {
  const res = await Meeting.findById(args._id).populate('teacher');
  return res;
};

export const planMeeting = async (_: null, args: MeetingArgs) => {
  const meeting = new Meeting({
    title: args.title,
    teacher: args.teacherID,
    date: args.date,
  });
  await meeting.save().catch((err: Error) => console.log(err));
  return meeting;
};
