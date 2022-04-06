export const reqSchema = `
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
export const reqQueries = `
  getRequests: [RequestType]
  getRequest(_id: String): RequestType
`;
export const reqMutations = `
  createRequest(userID: String, message: String, cv: String): RequestType
  updateRequest(_id: String, query: RequestInput): RequestType
`;
