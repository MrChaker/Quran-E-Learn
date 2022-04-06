export interface UserInterface {
  name?: string;
  email?: string;
  password?: string;
  image?: string;
  _id?: string;
  phone?: string;
  roles?: {
    student?: boolean;
    teacher?: boolean;
    admin?: boolean;
  };
}
export interface Teacher extends UserInterface {}
