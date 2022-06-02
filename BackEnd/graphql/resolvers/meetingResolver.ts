import { Meeting } from '../../models/meeting';
import { MeetingArgs } from '../types';

export class MeetingResolver {
  async getMeetings(_: null, args: { teachersIDs: string[] }) {
    const res = await Meeting.find({
      teacher: { $in: args.teachersIDs },
    }).populate('teacher');
    return res;
  }
  async getMeeting(_: null, args: { _id: string }) {
    const res = await Meeting.findById(args._id).populate('teacher');
    return res;
  }

  async planMeeting(_: null, args: MeetingArgs) {
    const meeting = new Meeting({
      title: args.title,
      teacher: args.teacherID,
      date: args.date,
      duration: args.duration,
    });
    await meeting.save().catch((err: Error) => console.log(err));
    return meeting;
  }
  async cancelMeeting(_: null, args: { _id: string }) {
    const canceled = await Meeting.findByIdAndDelete(args._id).catch(
      (err: Error) => console.log(err)
    );
    return canceled;
  }
}
