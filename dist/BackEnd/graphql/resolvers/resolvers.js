"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userResolver_1 = require("./userResolver");
const requestResolver_1 = require("./requestResolver");
const lessonResolver_1 = require("./lessonResolver");
const resolvers = {
    Query: {
        getUser: userResolver_1.getUser,
        getUsers: userResolver_1.getUsers,
        getCount: userResolver_1.getCount,
        getRequests: requestResolver_1.getRequests,
        getRequest: requestResolver_1.getRequest,
        getLessons: lessonResolver_1.getLessons,
        getLesson: lessonResolver_1.getLesson,
        getChapters: lessonResolver_1.getChapters,
    },
    Mutation: {
        updateUser: userResolver_1.updateUser,
        deleteUser: userResolver_1.deleteUser,
        createRequest: requestResolver_1.createRequest,
        handleRequest: requestResolver_1.handleRequest,
        createLesson: lessonResolver_1.createLesson,
        joinTeacher: userResolver_1.joinTeacher,
        deleteLesson: lessonResolver_1.deleteLesson,
    },
};
exports.default = resolvers;
