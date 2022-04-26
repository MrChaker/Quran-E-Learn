import mongoose, { Model } from 'mongoose';

import bcrypt from 'bcryptjs';
import { UserInterface } from '../Utils/interfaces/userInterface';
export interface UserModel extends Model<any> {
  loginAPI(email: string, Password: string): any;
}

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true, // handled in frontEnd
    unique: true, // handle here
    lowercase: true,
  },
  phone: { type: String, validate: /[0-9]{10}/ },
  image: String,
  password: {
    type: String,
    select: false,
  },
  roles: {
    student: { type: Boolean, default: true },
    teacher: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
  },
  //student properties
  Slessons: [
    {
      lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        default: null,
      },
      progress: { type: Number, default: 0 },
    },
  ],

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function (this: UserInterface) {
      return !this.roles?.teacher;
    },
    default: null,
  },

  // teacher properties
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function (this: UserInterface) {
        return this.roles?.teacher;
      },
      default: null,
    },
  ],
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function (this: UserInterface) {
        return this.roles?.teacher;
      },
      default: null,
    },
  ],
});

UserSchema.pre<UserInterface>('save', async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
UserSchema.pre<UserInterface>('remove', async function (next) {
  await mongoose.model('Request').findByIdAndDelete(this._id);
  next();
});
// log in function
UserSchema.static('loginAPI', async function loginAPI(Email, Password) {
  const user = await this.findOne({ email: Email });
  if (user) {
    const pass = await bcrypt.compare(Password, user.password);
    if (pass) {
      return user;
    }
    throw Error('Password incorrect');
  }
  throw Error('Email incorrect');
});

const User: UserModel = mongoose.model<any, UserModel>('User', UserSchema);
export default User;
