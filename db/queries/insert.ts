import { db } from "../database";
import {
  type InsertUser,
  type InsertSession,
  type InsertParticipation,
  users,
  sessions,
  participations,
} from "../schema";

export const createUser = async (data: InsertUser) => {
  if (data.passwordHash === "" || data.passwordHash === undefined) {
    data.passwordHash = "password";
  }
  const user = await db.insert(users).values(data);
  return user;
};

export const createSession = async (data: InsertSession) => {
  const session = await db.insert(sessions).values(data);
  return session;
};

export const createParticipation = async (data: InsertParticipation) => {
  const participation = await db.insert(participations).values(data);
  return participation;
};
