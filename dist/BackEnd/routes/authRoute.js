"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lesson_1 = __importDefault(require("../models/lesson"));
const user_1 = __importDefault(require("../models/user"));
const authErrors_1 = require("../Utils/authErrors");
authRoute.post('/sign', async (req, res) => {
    const hasToBeUnique = await (0, authErrors_1.uniqueValidator)({
        email: req.body.email,
        name: req.body.name,
    }, user_1.default);
    if (hasToBeUnique) {
        res.status(400).json({ SignErrors: hasToBeUnique });
    }
    // getting surah el fatiha for new students
    const firstLesson = await lesson_1.default.findOne({ title: 'سورة الفاتحة' }, { _id: 1 });
    const newUser = new user_1.default({
        name: req.body.name,
        email: req.body.email,
        sex: req.body.sex,
        image: req.body.sex == 'male' ? '/male.png' : '/female.png',
        password: req.body.password,
        phone: req.body.phone,
        Slessons: [firstLesson._id],
    });
    const user = await newUser.save().catch((err) => {
        console.log('Error: ', err);
        res.status(500).json({ err });
    });
    const jwtSecret = process.env.JWT_SECRET || '';
    const jwtToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, jwtSecret, {
        expiresIn: 60 * 60 * 24 * 3,
    });
    res.cookie('jwt', jwtToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 3 * 1000,
    });
    res.status(200).send({ success: true });
});
authRoute.post('/loginAPI', async (req, res) => {
    const { email, password } = req.body;
    const user = await user_1.default.findOne({ email });
    if (!user)
        return res.status(400).json({ LogError: 'البيانات خاطئة ، أعد المحاولة' });
    const userLog = await user_1.default.loginAPI(email, password).catch((error) => {
        console.log(error);
        return res.status(400).json({ LogError: 'البيانات خاطئة ، أعد المحاولة' });
    });
    const jwtSecret = process.env.JWT_SECRET || '';
    const jwtToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, jwtSecret, {
        expiresIn: 60 * 60 * 24 * 3,
    });
    res.cookie('jwt', jwtToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 3 * 1000,
    });
    res.status(200).send({ success: true });
});
authRoute.get('/logout', (req, res) => {
    res.cookie('session', '', { maxAge: 0.0001 });
    res.cookie('session.sig', '', { maxAge: 0.0001 });
    res.cookie('jwt', process.env.JWT_SECRET, { maxAge: 0.0001 });
    res.redirect('/auth/login');
});
authRoute.get('/user', (req, res) => {
    const jwtSecret = process.env.JWT_SECRET || '';
    jsonwebtoken_1.default.verify(req.cookies.jwt, jwtSecret, async (err, decodedToken) => {
        if (err) {
            console.log(err);
            res.status(401).send({ err: 'UnAuthenticated' });
        }
        else {
            const user = await user_1.default.findOne({ email: decodedToken.email }).catch((err) => console.log(err));
            const userObj = {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                image: user.image,
                sex: user.sex,
                roles: user.roles,
            };
            res.status(200).json(user.roles.teacher
                ? Object.assign(Object.assign({}, userObj), { lessons: user.lessons, students: user.students }) : Object.assign(Object.assign({}, userObj), { teacher: user.teacher, Slessons: user.Slessons }));
        }
    });
});
exports.default = authRoute;
