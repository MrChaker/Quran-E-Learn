"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLesson = exports.createLesson = exports.getChapters = exports.getLesson = exports.getLessons = void 0;
const lesson_1 = __importDefault(require("../../models/lesson"));
const user_1 = __importDefault(require("../../models/user"));
const getLessons = async (_, args) => {
    if (args.userID) {
        // if we want to get lessons related to a user ( created by 'teacher' forTeacher :true or getting studied by 'student' forTeacher: false)
        const res = await user_1.default.findById(args.userID, {
            Slessons: 1,
            lessons: 1,
        });
        const lessons = [];
        const teacherOrStudent = args.forTeacher
            ? [...res.lessons]
            : [...res.Slessons];
        teacherOrStudent.forEach((l) => {
            lessons.push(args.forTeacher ? l : l.lesson);
        });
        const lessonsRes = await lesson_1.default.find({ _id: { $in: lessons } }).populate('teacher');
        return lessonsRes;
    }
    const lessons = await lesson_1.default.find().populate('teacher', { name: 1 });
    return lessons;
};
exports.getLessons = getLessons;
const getLesson = async (_, args) => {
    const res = await lesson_1.default.findOne({ title: args.title });
    const final = res;
    final.chapters = [res.chapters[args.chapter - 1]];
    return final;
};
exports.getLesson = getLesson;
const getChapters = async (_, args) => {
    const res = await lesson_1.default.findOne({ title: args.title });
    return res;
};
exports.getChapters = getChapters;
const createLesson = async (_, args) => {
    console.log(args.chapter);
    const newLesson = new lesson_1.default({
        title: args.title,
        thumbnail: args.thumbnail,
        chapters: args.chapters,
        teacher: args.teacherID,
    });
    const res = await newLesson.save();
    // push it to teacher lessons
    const teacher = await user_1.default.findById(args.teacherID).populate('students');
    console.log(teacher);
    teacher.lessons.push(res.id);
    teacher.students.forEach((student) => {
        student.Slessons.push(res.id);
    });
    teacher.save();
    // put lesson to students db
    return res;
};
exports.createLesson = createLesson;
const deleteLesson = async (_, args) => {
    const res = await lesson_1.default.findOne({ title: args.title });
    res.remove();
    return res;
};
exports.deleteLesson = deleteLesson;
