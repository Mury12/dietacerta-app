export interface SignupUser {
  name: string;
  email: string;
  password?: string;
}
export interface User extends SignupUser {
  id?: number;
}
