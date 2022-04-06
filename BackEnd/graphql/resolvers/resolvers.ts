import { getUser, getCount, updateUser, deleteUser } from './userResolver';
import { getRequests, getRequest, createRequest } from './requestResolver';

const resolvers = {
  Query: {
    getUser,
    getCount,
    getRequests,
    getRequest,
  },
  Mutation: {
    updateUser,
    deleteUser,
    createRequest,
  },
};

export default resolvers;
