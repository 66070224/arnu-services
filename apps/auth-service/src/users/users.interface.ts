export interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export interface PublicUser {
  id: string;
  email: string;
  username: string;
}
