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
  },
  Mutation: {
    updateUser,
    deleteUser,
    createRequest,
    handleRequest,
    createLesson,
    joinTeacher,
    deleteLesson,
  },
};

export default resolvers;
