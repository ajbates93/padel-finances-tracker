import { type SelectUser, users, participations } from "../schema";
import { db } from "../database";
import { eq } from "drizzle-orm";

export const updateUser = async (
  id: SelectUser["id"],
  data: Partial<Omit<SelectUser, "id">>,
) => {
  return await db.update(users).set(data).where(eq(users.id, id));
};

// Update a participation record for a user in a session and whether they have
// paid or not
export const updateParticipation = async (
  userId: number,
  sessionId: number,
  hasPaid: boolean,
) => {
  return await db
    .update(participations)
    .set({ hasPaid })
    .where(
      eq(participations.userId, userId) &&
        eq(participations.sessionId, sessionId),
    );
};
