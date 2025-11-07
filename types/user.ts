export interface User {
  username: string;
  email: string;
  avatar: string;
}

export type RegisterLoginRequest = {
  email: string;
  password: string;
};
