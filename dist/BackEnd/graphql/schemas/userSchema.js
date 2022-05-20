"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMutations = exports.userQueries = exports.userSchema = void 0;
const roles = `
    student: Boolean
    teacher: Boolean
    admin: Boolean
`;
const UserInterface = `
    name: String
    email: String
    image: String
    phone: String
    sex: String
`;
exports.userSchema = `
  type UserType {
    _id: String
    ${UserInterface}
    roles: Roles
  }
  type Roles {
    ${roles}
  }
  input RolesInput {
    ${roles}
  }
  input UserInput {
    ${UserInterface}
    roles: RolesInput
  }
  
  type DocCount {
    students: Int
    teachers: Int
    lessons: Int
  }

`;
exports.userQueries = `
    getUser(_id: String): UserType
    getUsers(query: UserInput): [UserType]
    getCount: DocCount
`;
exports.userMutations = `
  updateUser(_id: String, query: UserInput): UserType
  deleteUser(_id: String): UserType,
  joinTeacher(teacherID: String, studentID: String): Boolean
`;
