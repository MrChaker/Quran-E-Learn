import { createContext } from 'react';
import {
  StudentInfo,
  TeacherInfo,
  UserInterface,
} from '../../BackEnd/Utils/interfaces/userInterface';

export type User = {
  info: UserInterface | null;
  teacherInfo?: TeacherInfo;
  studentInfo?: StudentInfo;
  isAuthenticated: boolean;
};

type UserInt = {
  user: User;
  setUser: (user: User) => void;
};

const initialState: User = {
  info: null,
  isAuthenticated: false,
};
export const UserContext = createContext<UserInt>({
  user: initialState,
  setUser: () => initialState,
});
