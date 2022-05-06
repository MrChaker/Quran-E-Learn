export interface UserInterface {
  name?: string;
  email?: string;
  password?: string;
  image?: string;
  _id?: string;
  phone?: string;
  sex?: 'male' | 'female';
  roles?: {
    student?: boolean;
    teacher?: boolean;
    admin?: boolean;
  };
}
export interface TeacherInfo {
  lessons?: string[];
  students?: string[];
}

export interface StudentInfo {
  lessons?: {
    title: string;
    progress: number;
  }[];
  teacher: string;
}
