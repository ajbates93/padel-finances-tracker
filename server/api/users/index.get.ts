import { getAllUsers, getUserById } from "~~/db/queries/select";
import { BaseApiResponse, UserApiResponse } from "~~/types/api";

export default defineEventHandler(async (event) => {
  // Read the body of the request
  const { id } = getQuery(event);

  // Get the user with the given ID
  const dbUser = id ? await getUserById(Number(id)) : await getAllUsers();

  if (!dbUser) {
    throw createError({
      statusMessage: "User not found",
      status: 404,
    });
  }

  const response: BaseApiResponse<UserApiResponse[]> = {
    data: dbUser,
    count: dbUser.length,
    success: true,
  };

  return response;
});
