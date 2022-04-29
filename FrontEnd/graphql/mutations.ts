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
    deleteUser(_id: $_id) {
      _id
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

const HANDLE_Request = gql`
  mutation handleRequest($_id: String!, $accepted: Boolean!, $userID: String) {
    handleRequest(_id: $_id, accepted: $accepted, userID: $userID)
  }
`;
const CREATE_Lesson = gql`
  mutation createLesson(
    $title: String
    $chapters: [ChapterInput]
    $thumbnail: String
    $teacherID: String
  ) {
    createLesson(
      title: $title
      chapters: $chapters
      thumbnail: $thumbnail
      teacherID: $teacherID
    ) {
      title
    }
  }
`;

export {
  CREATE_Request,
  UPDATE_User,
  DELETE_User,
  HANDLE_Request,
  CREATE_Lesson,
};
