export const userSchema = `
  type UserType {
    name: String
    _id: String
    email: String
    image: String
    phone: String
    roles: Roles
  }
  type Roles {
    student: Boolean
    teacher: Boolean
    admin: Boolean
  }
  input RolesInput {
    student: Boolean
    teacher: Boolean
    admin: Boolean
  }
  input UserInput {
    name: String
    email: String
    passwoed: String
    phone: String
    image: String
    roles: RolesInput
  }
  
  type DocCount {
    students: Int
    teachers: Int
  }

`;
export const userQueries = `
    getUser(_id: String): UserType
    getCount: DocCount
`;

export const userMutations = `
  updateUser(_id: String, query: UserInput): UserType
  deleteUser(_id: String): UserType
`;
