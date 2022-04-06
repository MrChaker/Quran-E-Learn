import { gql } from 'apollo-server-express';
import { reqMutations, reqQueries, reqSchema } from './reqSchema';
import { userMutations, userQueries, userSchema } from './userSchema';

const typeDefs = gql`
  ${userSchema}
  ${reqSchema}

  type Query {
    ${userQueries}
    ${reqQueries}
  }

  type Mutation {
    ${userMutations}
    ${reqMutations}
  }
`;

export default typeDefs;
