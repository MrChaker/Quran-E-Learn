export interface UserInterface {
  name: string,
  email: string,
  password: string,
  image: string,
  _id: string,
  isAdmin: boolean
}
export interface Teacher extends UserInterface{
  
}