import { PaginationDataRes, PaginationQuery } from "types/http.type";
import { handleGetRequest, handlePutRequest } from "./http.service";
import { INotification } from "types/notification";

export const getNotifications = async (query: PaginationQuery) => {
  // const queryString = constructQuery(query);
  return await handleGetRequest<PaginationDataRes<INotification>>(
    `/admins/notifications?page=${query.page}&limit=${query.limit}`
  );
};

export const readNotification = async (id: string) => {
  return await handlePutRequest<{}, null>(`/notifications/${id}/read`, {});
};

export const getNewNotificationCount = async () => {
  return await handleGetRequest<number>(`/notifications/new-count`);
};
