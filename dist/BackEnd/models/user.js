"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    roles: {
        student: { type: Boolean, default: true },
        teacher: { type: Boolean, default: false },
        admin: { type: Boolean, default: false },
    },
    //student properties
    Slessons: [
        {
            lesson: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Lesson',
                default: null,
            },
            progress: { type: Number, default: 0 },
        },
    ],
    teachers: [String],
    // teacher properties
    students: [String],
    lessons: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Lesson',
            default: null,
        },
    ],
});
exports.UserSchema.pre('save', async function (next) {
    if (this.password && this.__v == undefined) {
        const salt = await bcryptjs_1.default.genSalt();
        console.log(this.password);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
        console.log(this.password);
    }
    next();
});
exports.UserSchema.pre('remove', async function (next) {
    await mongoose_1.default.model('Request').findByIdAndDelete(this._id);
    next();
});
// log in function
exports.UserSchema.static('loginAPI', async function loginAPI(Email, Password) {
    const user = await this.findOne({ email: Email });
    if (user) {
        console.log(Password);
        const pass = await bcryptjs_1.default.compare(Password, user.password);
        console.log(pass);
        if (pass) {
            return user;
        }
        throw Error('Password incorrect');
    }
    throw Error('Email incorrect');
});
const User = mongoose_1.default.model('User', exports.UserSchema);
exports.default = User;
