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

const resolvers = {
  Query: {
    getUser,
    getUsers,
    getCount,
    getRequests,
    getRequest,
  },
  Mutation: {
    updateUser,
    deleteUser,
    createRequest,
    handleRequest,
  },
};

export default resolvers;
