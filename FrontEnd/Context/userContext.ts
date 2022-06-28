import { createContext, useContext } from 'react';
import {
  StudentInfo,
  TeacherInfo,
  UserInterface,
} from '../../interfaces/userInterface';

export type User = (UserInterface & TeacherInfo & StudentInfo) | null;

type UserInt = {
  user: User;
  setUser?: (user: User) => void;
};

export const UserContext = createContext<UserInt>({
  user: null,
  setUser: () => null,
});

export const useUserContext = () => useContext(UserContext);
