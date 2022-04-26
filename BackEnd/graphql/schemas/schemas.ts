import { gql } from 'apollo-server-express';
import { reqMutations, reqQueries, reqSchema } from './reqSchema';
import { userMutations, userQueries, userSchema } from './userSchema';
import { lessonMutations, lessonQueries, lessonSchema } from './lessonSchema';
const typeDefs = gql`
  ${userSchema}
  ${reqSchema}
  ${lessonSchema}
  type Query {
    ${userQueries}
    ${reqQueries}
    ${lessonQueries}
  }

  type Mutation {
    ${userMutations}
    ${reqMutations}
    ${lessonMutations}
  }
`;

export default typeDefs;
