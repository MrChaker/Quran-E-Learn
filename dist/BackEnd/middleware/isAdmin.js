"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const CheckAdmin = (req, res, next) => {
    var _a;
    const jwtSecret = process.env.JWT_SECRET || '';
    jsonwebtoken_1.default.verify((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt, jwtSecret, async (err, decoded) => {
        if (err)
            res.redirect('/');
        else {
            const user = await user_1.default.findById(decoded.id);
            if (user.roles.admin) {
                next();
            }
            else {
                res.redirect('/');
            }
        }
    });
};
exports.default = CheckAdmin;
