import { UserInterface } from '../Utils/interfaces/userInterface';

export type RequestType = {
  userID: string;
  message: string;
  cv: string;
};

export type UserUpdateArgs = {
  _id: string;
  query: UserInterface;
};
