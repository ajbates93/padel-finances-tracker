import { getUsersInSession } from "~~/db/queries/select";
import { createParticipation } from "~~/db/queries/insert";
import type { BaseApiResponse, ParticipationApiResponse } from "~~/types/api";

export default defineEventHandler(async (event) => {
  // Read the body of the request
  const body = await readBody(event);

  // Validate request
  if (!body.sessionId || !body.userId) {
    throw createError({
      statusMessage: "Missing required fields",
      status: 400,
    });
  }

  if (
    !Number.isInteger(Number(body.sessionId)) ||
    !Number.isInteger(Number(body.userId))
  ) {
    throw createError({
      statusMessage: "Invalid input",
      status: 400,
    });
  }

  // Check to see if the session already has 4 participants
  const dbUsersInSession = await getUsersInSession(Number(body.sessionId));

  if (dbUsersInSession.length === 4) {
    throw createError({
      statusMessage: "Session already has 4 participants.",
      status: 400,
    });
  }

  // Check to see if the user is already in the session
  const userExistsInSession = dbUsersInSession.some(
    (user) => user.userId === Number(body.userId),
  );

  if (userExistsInSession) {
    throw createError({
      statusMessage: "User is already in the session",
      status: 400,
    });
  }

  // Create a new user
  const dbParticipation = await createParticipation(body);

  if (dbParticipation.rowsAffected !== 1) {
    throw createError({
      statusMessage: "Failed to create participation record",
      status: 500,
    });
  }

  const response: BaseApiResponse<ParticipationApiResponse> = {
    data: dbParticipation.toJSON(),
    count: 1,
    success: true,
  };

  return response;
});
