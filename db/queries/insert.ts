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
  await db.insert(users).values(data);
};

export const createSession = async (data: InsertSession) => {
  await db.insert(sessions).values(data);
};

export const createParticipation = async (data: InsertParticipation) => {
  await db.insert(participations).values(data);
};
