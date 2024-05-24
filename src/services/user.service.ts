import { PaginationDataRes, PaginationQuery } from "types/http.type";
import { handleGetRequest } from "./http.service";
import { User } from "types/user.type";

export const getUsers = async (query: PaginationQuery) => {
  return await handleGetRequest<PaginationDataRes<User[]>>(
    `/admins/users?page${query.page}&limit=${query.limit}`
  );
};
