export interface UserObj {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

export interface User extends UserObj {
  avatar: string;
  isVerified: boolean;
  userId: string;
}
