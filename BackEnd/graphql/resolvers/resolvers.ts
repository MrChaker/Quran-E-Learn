import { UserResolver } from './userResolver';
import { RequestResolver } from './requestResolver';
import { LessonResolver } from './lessonResolver';
import { MeetingResolver } from './meetingResolver';

const lessonsR = new LessonResolver();
const meetingR = new MeetingResolver();
const requestR = new RequestResolver();
const userR = new UserResolver();
const resolvers = {
  Query: {
    getUser: userR.getUser,
    getUsers: userR.getUsers,
    getCount: userR.getCount,
    getRequests: requestR.getRequests,
    getRequest: requestR.getRequest,
    getLessons: lessonsR.getLessons,
    getLesson: lessonsR.getLesson,
    getChapters: lessonsR.getChapters,
    getMeetings: meetingR.getMeetings,
    getMeeting: meetingR.getMeeting,
  },
  Mutation: {
    updateUser: userR.updateUser,
    deleteUser: userR.deleteUser,
    createRequest: requestR.createRequest,
    handleRequest: requestR.handleRequest,
    joinTeacher: userR.joinTeacher,
    deleteLesson: lessonsR.deleteLesson,
    planMeeting: meetingR.planMeeting,
    cancelMeeting: meetingR.cancelMeeting,
  },
};

export default resolvers;
