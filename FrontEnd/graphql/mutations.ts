import { gql } from '@apollo/client';

const UPDATE_User = gql`
  mutation updateUser($_id: String!, $query: UserInput!) {
    updateUser(_id: $_id, query: $query) {
      _id
      email
    }
  }
`;
const DELETE_User = gql`
  mutation deleteUser($_id: String!) {
    updateUser(_id: $_id) {
      _id
      email
    }
  }
`;
const CREATE_Request = gql`
  mutation createRequest($userID: String, $message: String, $cv: String) {
    createRequest(userID: $userID, message: $message, cv: $cv) {
      _id
    }
  }
`;

export { CREATE_Request, UPDATE_User, DELETE_User };
