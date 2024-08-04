import { eq, gt, getTableColumns, count, sql } from "drizzle-orm";
import { db } from "../database";
import {
  type SelectUser,
  type SelectSession,
  users,
  sessions,
  participations,
} from "../schema";

export const getAllUsers = async (): Promise<
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
      createdAt: users.createdAt,
    })
    .from(users);
};

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
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, id));
};

export const getSessionById = async (
  id: SelectSession["id"],
): Promise<
  Array<{
    id: number;
    date: Date;
    cost: number;
    organiserId: number;
  }>
> => {
  return await db
    .select({
      ...getTableColumns(sessions),
    })
    .from(sessions)
    .where(eq(sessions.id, id));
};

// Get all users that participated in a session with a given ID
export const getUsersInSession = async (
  sessionId: SelectSession["id"],
): Promise<
  Array<{
    id: number;
    sessionId: number;
    userId: number;
    hasPaid: boolean;
    firstName: string;
    lastName: string;
    email: string;
  }>
> => {
  return await db
    .select({
      id: participations.id,
      sessionId: participations.sessionId,
      userId: participations.userId,
      hasPaid: participations.hasPaid,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
    })
    .from(participations)
    .where(eq(participations.sessionId, sessionId))
    .innerJoin(users, eq(participations.userId, users.id));
};

// Get all the upcoming sessions for a user with a given ID
export const getUpcomingSessionsForUser = async (
  userId: SelectUser["id"],
): Promise<
  Array<{
    id: number;
    date: Date;
    cost: number;
    organiserId: number;
  }>
> => {
  return await db
    .select({
      ...getTableColumns(sessions),
      organiserName: sql`${users.firstName} || ' ' || ${users.lastName}`,
      hasPaid: participations.hasPaid,
    })
    .from(participations)
    .where(eq(participations.userId, userId))
    .innerJoin(sessions, eq(participations.sessionId, sessions.id))
    .innerJoin(users, eq(sessions.organiserId, users.id));
};
