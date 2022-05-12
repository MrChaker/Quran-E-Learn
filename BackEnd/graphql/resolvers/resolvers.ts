import {
  getUser,
  getCount,
  updateUser,
  deleteUser,
  getUsers,
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
  },
};

export default resolvers;
