import { gql }  from 'apollo-server-express';
const typeDefs = gql`
  type UserType{
    name: String,
    _id: String,
    email: String,
    image: String,
    isAdmin: Boolean
  }
  type CloudinaryImage{
    file: String!,
    public_id: String!
  }

  type DocCount{
    students: Int,
    teachers: Int
  }

  enum ReqState{
    Waiting
    Accepted
    Declined
  }

  type RequestType{
    _id: String,
    user: UserType,
    message: String,
    cv: String,
    state: ReqState
  }
  type Query{
    getUser(_id: String): UserType,
    getCount: DocCount,
    getRequests: [RequestType],
    getRequest(_id: String): RequestType
  }

  type Mutation{
    createUser(name: String): String,
    updateImage( user_id: String, file: String): String,
    createRequest(userID: String, message: String, cv: String): RequestType
  }
`

export default typeDefs