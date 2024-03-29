export interface UserInfo {
  id: string;
  email: string;
  shop?: null | any;
  type: string;
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

export interface EmployerType {
  id: string;
  imageUrl: string;
  name: string;
  address1: string;
  address2: string;
  category: string;
  description: string;
  originalHourlyPay: string;
}

export interface EmployeeType {
  address: string;
  bio: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  shop: null | any;
  type: string;
}
