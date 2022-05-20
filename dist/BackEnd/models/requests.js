"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./user"));
const RequestSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: user_1.default
    },
    message: String,
    cv: String,
    state: {
        type: String,
        enum: ['Waiting', 'Accepted', 'Declined'],
        default: 'Waiting'
    }
});
const Request = mongoose_1.default.model('Request', RequestSchema);
exports.default = Request;
