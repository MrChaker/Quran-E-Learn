import { createContext } from "react";
import { UserInterface } from "../../BackEnd/Utils/userInterface";

type User = {
  info: UserInterface | null ,
  isAuthenticated: boolean,
}

type UserInt = {
  user: User,
  setUser: (user: User) => void
}

const userInterface: User = {
  info : null,
  isAuthenticated: false
}
export const UserContext = createContext<UserInt>({
  user: userInterface,
  setUser: () => userInterface
});