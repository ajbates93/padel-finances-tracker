export type UserApiResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type SessionApiResponse = {
  id: number;
  date: Date;
  cost: number;
  organiserId: number;
};

export type BaseApiResponse<T> = {
  data: T;
  count: number;
  success: boolean;
};
