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
export const userSchema = `
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
export const userQueries = `
    getUser(_id: String): UserType
    getUsers(query: UserInput): [UserType]
    getCount: DocCount
`;

export const userMutations = `
  updateUser(_id: String, query: UserInput): UserType
  deleteUser(_id: String): UserType,
  joinTeacher(teacherID: String, studentID: String): Boolean
`;
