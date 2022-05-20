"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqMutations = exports.reqQueries = exports.reqSchema = void 0;
exports.reqSchema = `
  enum ReqState {
    Waiting
    Accepted
    Declined
  }

  type RequestType {
    _id: String
    user: UserType
    message: String
    cv: String
    state: ReqState
  }
  input RequestInput {
    message: String
    cv: String
    state: ReqState
  }
`;
exports.reqQueries = `
  getRequests: [RequestType]
  getRequest(_id: String): RequestType
`;
exports.reqMutations = `
  createRequest(userID: String, message: String, cv: String): RequestType
  handleRequest(_id: String!, accepted: Boolean!, userID: String): String
`;
