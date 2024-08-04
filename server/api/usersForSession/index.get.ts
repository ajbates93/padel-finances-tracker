import { getUsersInSession } from "~~/db/queries/select";
import { BaseApiResponse, UserApiResponse } from "~~/types/api";

export default defineEventHandler(async (event) => {
  // Read the body of the request
  const { sessionId } = getQuery(event);

  // Get the user with the given ID
  const dbUsersInSession = await getUsersInSession(Number(sessionId));

  if (!dbUsersInSession) {
    throw createError({
      statusMessage: "No users found in session",
      status: 404,
    });
  }

  // Loop through each user in the session and retrieve the full user details

  const response: BaseApiResponse<UserApiResponse[]> = {
    data: dbUsersInSession,
    count: dbUsersInSession.length,
    success: true,
  };

  return response;
});
