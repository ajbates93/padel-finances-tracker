import { eq } from "drizzle-orm";
import { db } from "../database";
import {
  type SelectUser,
  type SelectSession,
  type SelectParticipation,
  users,
  sessions,
  participations,
} from "../schema";

export const getUserById = async (
  id: SelectUser["id"],
): Promise<
  Array<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }>
> => {
  return await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, id));
};

export const getSessionById = async (
  id: SelectSession["id"],
): Promise<
  Array<{
    id: number;
    date: number;
    cost: number;
    organiserId: number;
  }>
> => {
  return await db.select(sessions).where(eq(sessions.id, id));
};

// Get all users that participated in a session with a given ID
export const getUsersInSession = async (
  sessionId: SelectSession["id"],
): Promise<
  Array<{
    id: number;
    userId: number;
    sessionId: number;
    hasPaid: boolean;
  }>
> => {
  return await db
    .select(participations)
    .where(eq(participations.sessionId, sessionId));
};
