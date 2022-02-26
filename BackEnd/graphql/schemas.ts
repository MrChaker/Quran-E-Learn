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
  type Query{
    getUser(_id: String): UserType
  }

  type Mutation{
    createUser(name: String): String,
    updateImage( user_id: String, file: String): String
  }
`

export default typeDefs