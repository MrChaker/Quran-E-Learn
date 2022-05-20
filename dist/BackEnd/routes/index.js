"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
function routes(app) {
    router.get("/", (req, res) => {
        res.end("Welcome to the depth of the ocean");
    });
    return router;
}
exports.default = routes;
