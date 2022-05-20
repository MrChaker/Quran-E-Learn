"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonSchema = exports.GFS = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./user"));
exports.GFS = mongoose_1.default.model('GFS', new mongoose_1.default.Schema({}, { strict: false }), 'uploads.files');
exports.LessonSchema = new mongoose_1.default.Schema({
    title: String,
    chapters: [
        {
            name: String,
            content: String,
            video: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'GFS',
            },
        },
    ],
    thumbnail: String,
    teacher: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: user_1.default,
    },
}, {
    timestamps: true,
});
exports.LessonSchema.pre('remove', async function (next) {
    try {
        this.chapters.forEach(async (chapter) => {
            await exports.GFS.findByIdAndDelete(chapter.video);
        });
        const teacher = await user_1.default.findByIdAndUpdate(this.teacher, {
            $pull: { lessons: this._id },
        });
        const students = await user_1.default.updateMany({ Slessons: this._id }, {
            $pull: { Slessons: this._id },
        });
    }
    catch (error) {
        console.log(error);
    }
    next();
});
const Lesson = mongoose_1.default.model('Lesson', exports.LessonSchema);
exports.default = Lesson;
