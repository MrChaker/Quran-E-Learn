import { UserInterface } from "./userInterface";

export interface Request{
  _id: string,
  user: UserInterface ,
  message?: string,
  cv?: string,
  state: 'Waiting' | 'Accepted' | 'Declined'
}