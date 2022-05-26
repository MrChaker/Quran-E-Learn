import { gql } from 'apollo-server-express';
import { reqMutations, reqQueries, reqSchema } from './reqSchema';
import { userMutations, userQueries, userSchema } from './userSchema';
import { lessonMutations, lessonQueries, lessonSchema } from './lessonSchema';
import {
  meetingMutations,
  meetingQueries,
  meetingSchema,
} from './meetingSchema';
const typeDefs = gql`
  ${userSchema}
  ${reqSchema}
  ${lessonSchema}
  ${meetingSchema}
  type Query {
    ${userQueries}
    ${reqQueries}
    ${lessonQueries}
  ${meetingQueries}

  }

  type Mutation {
    ${userMutations}
    ${reqMutations}
    ${lessonMutations}
    ${meetingMutations}
  }
`;

export default typeDefs;
