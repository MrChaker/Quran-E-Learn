import {
  getUser,
  getCount,
  updateUser,
  deleteUser,
  getUsers,
  joinTeacher,
} from './userResolver';
import {
  getRequests,
  getRequest,
  createRequest,
  handleRequest,
} from './requestResolver';
import {
  getLesson,
  getLessons,
  createLesson,
  getChapters,
  deleteLesson,
} from './lessonResolver';
import { getMeetings, getMeeting, planMeeting } from './meetingResolver';
const resolvers = {
  Query: {
    getUser,
    getUsers,
    getCount,
    getRequests,
    getRequest,
    getLessons,
    getLesson,
    getChapters,
    getMeetings,
    getMeeting,
  },
  Mutation: {
    updateUser,
    deleteUser,
    createRequest,
    handleRequest,
    createLesson,
    joinTeacher,
    deleteLesson,
    planMeeting,
  },
};

export default resolvers;
