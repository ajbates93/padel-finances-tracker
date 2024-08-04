import { getUpcomingSessionsForUser } from "~~/db/queries/select";
import { BaseApiResponse, SessionApiResponse } from "~~/types/api";

export default defineEventHandler(async (event) => {
  // Read the body of the request
  const { userId } = getQuery(event);

  console.log(userId);
  // Get the user with the given ID
  const dbSessionsForUser = await getUpcomingSessionsForUser(Number(userId));

  if (!dbSessionsForUser) {
    throw createError({
      statusMessage: "No sessions found for user",
      status: 404,
    });
  }

  // Loop through each user in the session and retrieve the full user details

  const response: BaseApiResponse<SessionApiResponse[]> = {
    data: dbSessionsForUser,
    count: dbSessionsForUser.length,
    success: true,
  };

  return response;
});
