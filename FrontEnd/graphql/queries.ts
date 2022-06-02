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
      image
      phone
    }
  }
`;
const GET_DocCount = gql`
  query {
    getCount {
      students
      teachers
      lessons
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

const GET_Lessons = gql`
  query getLessons($userID: String, $forTeacher: Boolean) {
    getLessons(userID: $userID, forTeacher: $forTeacher) {
      title
      thumbnail

      teacher {
        _id
        name
      }
    }
  }
`;
const GET_Lesson = gql`
  query getLesson($title: String, $chapter: Int) {
    getLesson(title: $title, chapter: $chapter) {
      title
      chapters {
        name
        content
        video
      }
    }
  }
`;
const GET_Meetings = gql`
  query getMeetins($teachersIDs: [String]) {
    getMeetings(teachersIDs: $teachersIDs) {
      _id
      title
      date
      teacher {
        _id
        name
      }
      duration
    }
  }
`;
export {
  GET_User,
  GET_DocCount,
  GET_Request,
  GET_Requests,
  GET_AllUsers,
  GET_Lessons,
  GET_Lesson,
  GET_Meetings,
};
