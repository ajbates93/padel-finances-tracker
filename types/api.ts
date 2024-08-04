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

export type ParticipationApiResponse = {
  id: number;
  userId: number;
  sessionId: number;
  hasPaid: boolean;
};

export type BaseApiResponse<T> = {
  data: T;
  count: number;
  success: boolean;
};
