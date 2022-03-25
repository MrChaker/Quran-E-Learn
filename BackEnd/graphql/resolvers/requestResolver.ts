import Request from "../../models/requests";
import { RequestType } from '../types'
export const getRequests = async () => {
  const requests = await Request.find().populate('user');
  return requests
}

export const getRequest = async (_:null, args: {_id: string} ) => {
  
  const request = await Request.findById(args._id).populate('user');
  return request
}

export const createRequest = async (_:null, args: RequestType ) => {
  const newReq = new Request({
    user: args.userID,
    message: args.message,
    cv: args.cv
  });
  const res = await newReq.save()
  return res
}