import { gql } from '@apollo/client';

const GET_User = gql`
  query getUser($_id: String!) {
    getUser(_id: $_id) {
      name
      image
    }
  }
`;
const GET_AllUsers = gql`
  query getUsers($query: UserInput) {
    getUsers(query: $query) {
      _id
      name
      email
      roles {
        admin
        teacher
        student
      }
      phone
    }
  }
`;
const GET_DocCount = gql`
  query {
    getCount {
      students
      teachers
    }
  }
`;
const GET_Requests = gql`
  query {
    getRequests {
      _id
      user {
        _id
        name
      }
      state
    }
  }
`;
const GET_Request = gql`
  query getRequest($_id: String!) {
    getRequest(_id: $_id) {
      _id
      state
      user {
        _id
        name
        email
        phone
      }
      message
      cv
    }
  }
`;
export { GET_User, GET_DocCount, GET_Request, GET_Requests, GET_AllUsers };
