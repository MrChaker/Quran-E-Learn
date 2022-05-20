"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const mongoose_1 = __importDefault(require("mongoose"));
const lesson_1 = __importStar(require("../models/lesson"));
const imageGenerator_1 = __importDefault(require("../Utils/imageGenerator"));
const user_1 = __importDefault(require("../models/user"));
const videoRoute = express_1.default.Router();
// Create storage engine
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: process.env.MONGO_URI || 'mongodb://localhost:27017/Quran',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            console.log(file.originalname);
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads',
            };
            resolve(fileInfo);
        });
    },
});
const updateLessonArrays = async (teacherID, lessonID) => {
    const teacher = await user_1.default.findById(teacherID);
    const hisStudents = await user_1.default.find({ _id: { $in: teacher.students } });
    teacher.lessons.push(lessonID);
    hisStudents.forEach((student) => {
        student.Slessons.push({ lesson: lessonID, progress: 0 });
        student.save();
    });
    teacher.save();
};
videoRoute.post('/i', async (req, res) => {
    const i = await (0, imageGenerator_1.default)('fatiha');
    res.json({ d: i });
});
videoRoute.post('/upload', (0, multer_1.default)({ storage }).single('video'), async (req, res) => {
    const video = req.file;
    if (req.body.isNew == 'true') {
        const newLesson = new lesson_1.default({
            title: req.body.title,
            chapters: [
                {
                    name: req.body.chapter,
                    video: video.id,
                    content: req.body.content,
                },
            ],
            thumbnail: await (0, imageGenerator_1.default)(req.body.title),
            teacher: req.body.teacherID,
        });
        const nl = await newLesson
            .save()
            .catch(() => res.status(404).json({ failure: 'not saved' }));
        await updateLessonArrays(req.body.teacherID, nl.id);
        res.status(200).json({ lessonTitle: nl.title });
    }
    else {
        await lesson_1.default.findOneAndUpdate({ title: req.body.title }, {
            $push: {
                chapters: {
                    name: req.body.chapter,
                    video: video.id,
                    content: req.body.content,
                },
            },
        }).catch((err) => res.status(404).json({ failure: 'not saved' }));
        res.status(200).json({ lessonTitle: req.body.title });
    }
});
videoRoute.get('/:id', (req, res) => {
    lesson_1.GFS.findById(req.params.id, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists',
            });
        }
        // Read output to browser
        const range = req.headers.range;
        if (!range) {
            res.status(400).send('Requires Range header');
        }
        else {
            // Create response headers
            /* const start = Number(range.replace(/\D/g, ''));
            const end = file.length - 1;
      
            const contentLength = end - start + 1;
            const headers = {
              'Content-Range': `bytes ${start}-${end}/${file.length}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': contentLength,
              'Content-Type': 'video/mp4',
            };
      
            // HTTP Status 206 for Partial Content
            res.writeHead(206, headers); */
            let gridfsBucket = new mongoose_1.default.mongo.GridFSBucket(mongoose_1.default.connection.db, {
                bucketName: 'uploads',
            });
            const readstream = gridfsBucket.openDownloadStream(file._id);
            readstream.pipe(res);
        }
    });
});
exports.default = videoRoute;
