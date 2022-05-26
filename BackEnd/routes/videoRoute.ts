import express from 'express';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from 'mongoose';
import Lesson, { GFS } from '../models/lesson';
import imageFromText from '../Utils/imageGenerator';
import User from '../models/user';

const videoRoute = express.Router();

// Create storage engine
const storage = new GridFsStorage({
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

const updateLessonArrays = async (teacherID: string, lessonID: string) => {
  const teacher = await User.findById(teacherID);
  const hisStudents = await User.find({ _id: { $in: teacher.students } });
  teacher.lessons.push(lessonID);
  hisStudents.forEach((student: any) => {
    student.Slessons.push({ lesson: lessonID, progress: 0 });
    student.save();
  });
  teacher.save();
};

//test image generator
videoRoute.get('/i', async (req, res) => {
  await imageFromText('سورة الفاتحة')
    .then(async (image) => {
      const ress = await Lesson.findOneAndUpdate(
        { title: 'سورة الفاتحة' },
        { thumbnail: image }
      );
      res.json({ ress });
    })
    .catch((err) => console.log(err));
});
videoRoute.post(
  '/upload',
  multer({ storage }).single('video'),
  async (req, res) => {
    const video: any = req.file;
    if (req.body.isNew == 'true') {
      const newLesson = new Lesson({
        title: req.body.title,
        chapters: [
          {
            name: req.body.chapter,
            video: video.id,
            content: req.body.content,
          },
        ],
        thumbnail: await imageFromText(req.body.title),
        teacher: req.body.teacherID,
      });
      const nl = await newLesson
        .save()
        .catch(() => res.status(404).json({ failure: 'not saved' }));

      await updateLessonArrays(req.body.teacherID, nl.id);
      res.status(200).json({ lessonTitle: nl.title });
    } else {
      await Lesson.findOneAndUpdate(
        { title: req.body.title },
        {
          $push: {
            chapters: {
              name: req.body.chapter,
              video: video.id,
              content: req.body.content,
            },
          },
        }
      ).catch((err) => res.status(404).json({ failure: 'not saved' }));
      res.status(200).json({ lessonTitle: req.body.title });
    }
  }
);
videoRoute.get('/:id', (req, res) => {
  GFS.findById(req.params.id, (err: any, file: any) => {
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
    } else {
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
      let gridfsBucket = new mongoose.mongo.GridFSBucket(
        mongoose.connection.db,
        {
          bucketName: 'uploads',
        }
      );
      const readstream = gridfsBucket.openDownloadStream(file._id);

      readstream.pipe(res);
    }
  });
});
export default videoRoute;
