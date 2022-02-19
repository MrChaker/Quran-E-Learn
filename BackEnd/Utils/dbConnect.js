import mongoose from 'mongoose'

const connection = {}

export default async function Connect(){
    Object.keys(mongoose.connection.models).forEach(key => {
        delete mongoose.connection.models[key];
      });
    const db = await mongoose.connect(process.env.MONGO_URI,{ 
        useUnifiedTopology: true,
        useNewUrlParser : true
    });
    connection.isConnected = db.connection.readyState
    console.log(process.env.MONGO_URI);
}
