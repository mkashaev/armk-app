export interface IUser {
  _id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  token: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}
