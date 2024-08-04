import { createSession } from "~~/db/queries/insert";
import { BaseApiResponse, SessionApiResponse } from "~~/types/api";

export default defineEventHandler(async (event) => {
  // Read the body of the request
  const body = await readBody(event);

  const date = new Date(body.date);
  body.date = date;

  // Create a new user
  const session = await createSession(body);

  if (session.rowsAffected !== 1) {
    throw createError({
      statusMessage: "Failed to create session",
      status: 500,
    });
  }

  const response: BaseApiResponse<SessionApiResponse> = {
    data: session.toJSON(),
    count: 1,
    success: true,
  };

  return response;
});
