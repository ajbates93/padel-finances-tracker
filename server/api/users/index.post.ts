import { createUser } from "~~/db/queries/insert";
import type { BaseApiResponse, UserApiResponse } from "~~/types/api";

export default defineEventHandler(async (event) => {
  // Read the body of the request
  const body = await readBody(event);

  // Create a new user
  const dbUser = await createUser(body);

  if (dbUser.rowsAffected !== 1) {
    throw createError({
      statusMessage: "Failed to create user",
      status: 500,
    });
  }

  const response: BaseApiResponse<UserApiResponse> = {
    data: dbUser.toJSON(),
    count: 1,
    success: true,
  };

  return response;
});
