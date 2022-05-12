import mongoose from 'mongoose';
import g from 'gridfs-stream';
const connection = {};

export default async function Connect() {
  Object.keys(mongoose.connection.models).forEach((key) => {
    delete mongoose.connection.models[key];
  });
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  connection.isConnected = db.connection.readyState;

  mongoose.connection.once('open', () => {
    let gfs = g(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');

    console.log('connection made successfully');
  });

  console.log(process.env.MONGO_URI);
}
