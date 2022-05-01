import express from 'express';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from 'mongoose';
import { GFS } from '../models/lesson';
const videoRoute = express.Router();

// Init gfs

let gridfsBucket: any;
mongoose.connection.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads',
  });
});

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI || 'mongo://',
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

videoRoute.post('/upload', multer({ storage }).single('video'), (req, res) => {
  res.status(200).json({ file: req.file });
});
videoRoute.get('/:id', (req, res) => {
  GFS.findById(req.params.id, (err: any, file: any) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }
    // Read output to browser
    const readstream = gridfsBucket.openDownloadStream(file._id);
    readstream.pipe(res);
    /* if (!range) {
      const head = {
        'Content-Length': file.length,
        'Content-Type': 'video/mp4',
      }; */
    /* } else {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : file.length - 1;
      const chunksize = end - start + 1;
      const readstream = gridfsBucket.openDownloadStream(file._id, {
        start,
        end,
      });
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${file.length}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, headers);

      readstream.pipe(res);
    } */
  });
});
export default videoRoute;
