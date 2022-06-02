import { UserInterface } from '../../interfaces/userInterface';

export type RequestType = {
  userID: string;
  message: string;
  cv: string;
};

export type MeetingArgs = {
  title: string;
  teacherID: string;
  date: string;
  duration: number;
};
