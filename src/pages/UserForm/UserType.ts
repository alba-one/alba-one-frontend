export interface UserType {
  [key: string]: string;
  email: string;
  password: string;
  check: string;
  type: 'employee' | 'employer';
}

export interface UserInputType {
  id: number;
  title: string;
  type: string;
  name: string;
  placeholder: string;
}

export interface ValidList {
  [key: string]: boolean;
}

export interface ErrorMessageList {
  [key: string]: string;
}
