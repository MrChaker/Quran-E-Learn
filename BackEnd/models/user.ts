import mongoose, { Model } from 'mongoose';

import bcrypt from 'bcryptjs';
import { UserInterface } from '../../interfaces/userInterface';
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
  sex: {
    type: String,
    enum: ['male', 'female'],
  },
  image: String,
  password: {
    type: String,
  },
  isConfirmed: { type: Boolean, default: false },
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
  teachers: [String], // this is suppose to ref to User but seems not an easy task to do, so we'll do it the stupid way
  // teacher properties
  students: [String], // this is suppose to ref to User but seems not an easy task to do, so we'll do it the stupid way
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      default: null,
    },
  ],
});

UserSchema.pre('save', async function (next) {
  if (this.password && this.__v == undefined) {
    const salt = await bcrypt.genSalt();
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
  }
  next();
});
UserSchema.pre<UserInterface>('remove', async function (next) {
  await mongoose.model('Request').findOneAndDelete({ user: this._id });
  await mongoose.model('Meeting').deleteMany({ teacher: this._id });
  const lessons = await mongoose.model('Lesson').find({ teacher: this._id });
  lessons.forEach(async (l) => await l.remove()); // to proc remove hook on lesson model
  next();
});
// log in function
UserSchema.static(
  'loginAPI',
  async function loginAPI(Email: string, Password: string) {
    const user = await this.findOne({ email: Email });
    if (user) {
      const pass = await bcrypt.compare(Password, user.password);
      if (pass) {
        return user;
      }
      throw Error('Password incorrect');
    }
    throw Error('Email incorrect');
  }
);

const User: UserModel = mongoose.model<any, UserModel>('User', UserSchema);

export default User;
