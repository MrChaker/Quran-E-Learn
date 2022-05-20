"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const reqSchema_1 = require("./reqSchema");
const userSchema_1 = require("./userSchema");
const lessonSchema_1 = require("./lessonSchema");
const typeDefs = (0, apollo_server_express_1.gql) `
  ${userSchema_1.userSchema}
  ${reqSchema_1.reqSchema}
  ${lessonSchema_1.lessonSchema}
  type Query {
    ${userSchema_1.userQueries}
    ${reqSchema_1.reqQueries}
    ${lessonSchema_1.lessonQueries}
  }

  type Mutation {
    ${userSchema_1.userMutations}
    ${reqSchema_1.reqMutations}
    ${lessonSchema_1.lessonMutations}
  }
`;
exports.default = typeDefs;
