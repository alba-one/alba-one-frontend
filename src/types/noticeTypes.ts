export interface Notice extends NoticeDetail {
  shop: { href: string; item: ShopInfo };
}

export interface ShopInfo {
  address1: string;
  address2: string;
  category: string;
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  originalHourlyPay: string;
}

export interface NoticeDetail {
  closed: boolean;
  currentUserApplication: null;
  description: string;
  hourlyPay: string;
  id: string;
  startsAt: string;
  workhour: string;
}
