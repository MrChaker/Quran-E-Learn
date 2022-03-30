import Request from "../../models/requests";
import { RequestType } from '../types'
import cloudinary  from 'cloudinary'
export const getRequests = async () => {
  const requests = await Request.find().populate('user');
  return requests
}

export const getRequest = async (_:null, args: {_id: string} ) => {
  
  const request = await Request.findById(args._id).populate('user');
  return request
}

export const createRequest = async (_:null, args: RequestType ) => {
  const uploadPreset: string = process.env.CLOUD_ASSET || '';

  const result = await cloudinary.v2.uploader.upload(args.cv , { public_id: `teaching_request_for${args.userID}`,folder: 'Quran/', invalidate: true })
  console.log(result)

  const newReq = new Request({
    user: args.userID,
    message: args.message,
    cv: result.secure_url
  });

  const res = await newReq.save()
  return res
}