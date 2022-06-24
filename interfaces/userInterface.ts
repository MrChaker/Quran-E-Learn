export interface UserInterface {
  name?: string;
  email?: string;
  password?: string;
  image?: string;
  _id?: string;
  phone?: string;
  isConfirmed?: boolean;
  sex?: 'male' | 'female';
  roles?: {
    student?: boolean;
    teacher?: boolean;
    admin?: boolean;
  };
}
export interface TeacherInfo {
  lessons?: string[]; // id[]
  students?: (UserInterface & StudentInfo)[];
}

export interface StudentInfo {
  lessons?: {
    title: string;
    progress: number;
  }[];
  teachers: string[]; // id[]
}
