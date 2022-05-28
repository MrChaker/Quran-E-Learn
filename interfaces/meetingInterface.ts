import { UserInterface, TeacherInfo } from './userInterface';

export interface Meeting {
  _id: string;
  title?: string;
  teacher?: UserInterface & TeacherInfo;
  date?: string | Date;
}
