"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = exports.createRequest = exports.getRequest = exports.getRequests = void 0;
const requests_1 = __importDefault(require("../../models/requests"));
const user_1 = __importDefault(require("../../models/user"));
const getRequests = async () => {
    const requests = await requests_1.default.find().populate('user');
    return requests;
};
exports.getRequests = getRequests;
const getRequest = async (_, args) => {
    const request = await requests_1.default.findById(args._id).populate('user');
    return request;
};
exports.getRequest = getRequest;
const createRequest = async (_, args) => {
    const newReq = new requests_1.default({
        user: args.userID,
        message: args.message,
        cv: args.cv,
    });
    const res = await newReq.save();
    return res;
};
exports.createRequest = createRequest;
const handleRequest = async (_, args) => {
    /* const state = args.accepted ? 'Accepted' : 'Declined';
    const req = await Request.findByIdAndUpdate(args._id, { state }); */
    if (args.accepted) {
        await user_1.default.findByIdAndUpdate(args.userID, {
            'roles.teacher': true,
            lessons: [],
            students: [],
        }).catch((err) => console.log(err));
    }
    await requests_1.default.findByIdAndDelete(args._id);
    return 'done';
};
exports.handleRequest = handleRequest;
