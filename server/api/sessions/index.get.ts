import { getSessionById } from "~~/db/queries/select";
import { BaseApiResponse, SessionApiResponse } from "~~/types/api";

export default defineEventHandler(async (event) => {
  // Read the body of the request
  const { id } = getQuery(event);

  // Get the user with the given ID
  const dbSession = await getSessionById(Number(id));

  if (!dbSession) {
    throw createError({
      statusMessage: "Session not found",
      status: 404,
    });
  }

  const response: BaseApiResponse<SessionApiResponse[]> = {
    data: dbSession,
    count: dbSession.length,
    success: true,
  };

  return response;
});
