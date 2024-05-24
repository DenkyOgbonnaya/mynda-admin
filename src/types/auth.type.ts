export interface LoginInput {
  email: string;
  password: string;
}
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;

  createdAt: string;
  updatedAt: string;
}
export interface LoginRes {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
