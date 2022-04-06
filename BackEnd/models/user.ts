import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import Request from './requests';
interface UserModel extends Model<any> {
  loginAPI(email: string, Password: string): any;
}

const UserSchema = new mongoose.Schema({
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
    validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // handdled in frontEnd
  },
  phone: { type: String, validate: /[0-9]{10}/ },
  image: String,
  password: String,
  roles: {
    student: { type: Boolean, default: true },
    teacher: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
  },
});
UserSchema.pre('save', async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
UserSchema.pre('remove', async function (next) {
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
