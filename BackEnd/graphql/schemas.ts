import { gql }  from 'apollo-server-express';
const typeDefs = gql`
  type Query{
    getUser(id: String): String
  }

  type Mutation{
    createUser(name: String): String
  }
`

export default typeDefs