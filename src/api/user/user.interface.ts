export interface IUser {
  id: string;
  short_id: string;
  readonly name: string;
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;
  updated_at: Date;
  created_at: Date;
}
