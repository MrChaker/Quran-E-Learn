import { gql }  from 'apollo-server-express';
const typeDefs = gql`

  type CloudinaryImage{
    file: String!,
    public_id: String!
  }
  type Query{
    getUser(id: String): String
  }

  type Mutation{
    createUser(name: String): String,
    updateImage( user_id: String, file: String): String
  }
`

export default typeDefs