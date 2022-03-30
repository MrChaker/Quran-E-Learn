import  mongoose, { Model } from 'mongoose';
import User from './user';

const RequestSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User
    },
    message: String,
    cv: {
      data:  String,
      fileType: String
    },
    state: {
      type: String,
      enum: ['Waiting', 'Accepted', 'Declined'],
      default: 'Waiting'
    }
})


const Request = mongoose.model<any, Model<any>>('Request', RequestSchema);
export default Request;
