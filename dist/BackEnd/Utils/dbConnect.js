"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gridfs_stream_1 = __importDefault(require("gridfs-stream"));
const connection = {};
async function Connect() {
    Object.keys(mongoose_1.default.connection.models).forEach((key) => {
        delete mongoose_1.default.connection.models[key];
    });
    const db = await mongoose_1.default.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    connection.isConnected = db.connection.readyState;
    mongoose_1.default.connection.once('open', () => {
        let gfs = (0, gridfs_stream_1.default)(mongoose_1.default.connection.db, mongoose_1.default.mongo);
        gfs.collection('uploads');
        console.log('connection made successfully');
    });
    console.log(process.env.MONGO_URI);
}
exports.default = Connect;
