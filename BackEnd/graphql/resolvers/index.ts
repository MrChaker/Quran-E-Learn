
import { getUser, getCount, updateImage } from "./userResolver";
import { getRequests, getRequest, createRequest } from "./requestResolver";

const resolvers = {
  Query: {
    getUser,
    getCount,
    getRequests,
    getRequest
  },
  Mutation:{
    updateImage,
    createRequest
  }
}

export default resolvers