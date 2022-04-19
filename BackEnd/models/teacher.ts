import mongoose from 'mongoose';
import { UserModel, UserSchema } from './user';
import User from './user';
import Lesson from './lesson';

function extendSchema(Schema: mongoose.Schema, definition: {}, options?: any) {
  return new mongoose.Schema(
    Object.assign({}, Schema.obj, definition),
    options
  );
}
const TeacherSchema = extendSchema(UserSchema, {
  parentID: String,
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: User,
    default: [],
  },
  lessons: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: Lesson,
    default: [],
  },
});

const Teacher: UserModel = mongoose.model<any, UserModel>(
  'Teacher',
  TeacherSchema
);
export default Teacher;
