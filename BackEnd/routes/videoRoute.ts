import express from 'express';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import g, { Grid } from 'gridfs-stream';
import mongoose from 'mongoose';
import { GFS } from '../models/lesson';
const videoRoute = express.Router();

// Init gfs
let gfs: Grid;
let gridfsBucket: any;
mongoose.connection.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads',
  });

  gfs = g(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
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
    const range = req.headers.range;
    if (!range) {
      res.header('Content-Length', file.length);
      res.header('Content-Type', file.contentType);
      const readstream = gridfsBucket.openDownloadStream(file._id);
      readstream.pipe(res);
    } else {
      const chunksize = 10 ** 6;
      var parts = range.replace(/bytes=/, '').split('-');
      var partialstart = parts[0];
      var partialend = parts[1];

      var start = parts[0] ? partialstart + partialend + 1 : 1;
      var end = parts[1] ? partialend + chunksize : chunksize;

      res.writeHead(206, {
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Range': 'bytes ' + start + '-' + end + '/' + file.length,
        'Content-Type': file.contentType,
      });

      /* const readstream = gfs?.createReadStream(file.filename); */
      const readstream = gridfsBucket.openDownloadStream(file._id, {
        start,
        end,
      });
      readstream.pipe(res);
    }
  });
});
export default videoRoute;
