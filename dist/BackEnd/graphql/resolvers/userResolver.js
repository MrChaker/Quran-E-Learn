"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinTeacher = exports.deleteUser = exports.updateUser = exports.getCount = exports.getUsers = exports.getUser = void 0;
const lesson_1 = __importDefault(require("../../models/lesson"));
const user_1 = __importDefault(require("../../models/user"));
//queries
const getUser = async (_, args) => {
    const user = await user_1.default.findById(args._id);
    return user;
};
exports.getUser = getUser;
const handleRoleQuery = (queryFromArgs) => {
    var _a, _b, _c;
    let roles = {};
    if (((_a = queryFromArgs.roles) === null || _a === void 0 ? void 0 : _a.student) != undefined) {
        roles = Object.assign({}, roles, {
            'roles.student': queryFromArgs.roles.student,
        });
    }
    if (((_b = queryFromArgs.roles) === null || _b === void 0 ? void 0 : _b.teacher) != undefined) {
        roles = Object.assign({}, roles, {
            'roles.teacher': queryFromArgs.roles.teacher,
        });
    }
    if (((_c = queryFromArgs.roles) === null || _c === void 0 ? void 0 : _c.admin) != undefined) {
        roles = Object.assign({}, roles, {
            'roles.admin': queryFromArgs.roles.admin,
        });
    }
    delete queryFromArgs.roles;
    return Object.assign({}, queryFromArgs, roles);
};
const getUsers = async (_, args) => {
    const users = await user_1.default.find(handleRoleQuery(args.query));
    return users;
};
exports.getUsers = getUsers;
const getCount = async () => {
    const result = {
        students: await user_1.default.countDocuments({
            'roles.student': true,
            'roles.teacher': false,
        }),
        teachers: await user_1.default.countDocuments({ 'roles.teacher': true }),
        lessons: await lesson_1.default.countDocuments(),
    };
    return result;
};
exports.getCount = getCount;
//mutation
const updateUser = async (_, args) => {
    const res = await user_1.default.findByIdAndUpdate(args._id, handleRoleQuery(args.query));
    return res;
};
exports.updateUser = updateUser;
const deleteUser = async (_, args) => {
    const res = await user_1.default.findById(args._id);
    res.remove();
    return res;
};
exports.deleteUser = deleteUser;
const joinTeacher = async (_, args) => {
    try {
        const teacher = await user_1.default.findByIdAndUpdate(args.teacherID, {
            $push: { students: args.studentID },
        });
        const student = await user_1.default.findByIdAndUpdate(args.studentID);
        student.teachers.push(args.teacherID);
        if (teacher.lessons.length > 0) {
            teacher.lessons.forEach((lesson) => {
                student.Slessons.push({ lesson, progress: 0 });
            });
        }
        await student.save();
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.joinTeacher = joinTeacher;
//**image requires extra work
/* export const updateImage = async (_: null, args: ImageArgs) => {
  await cloudinary.v2.uploader.destroy(args.user_id);

  const result = await cloudinary.v2.uploader.upload(args.file, {
    public_id: `${args.user_id}`,
    folder: 'Quran/',
    invalidate: true,
    faces: true,
  });

  await User.findByIdAndUpdate(args.user_id, {
    image: result.secure_url,
  }).catch((err) => console.log(err));
  return result.secure_url;
};
 */
