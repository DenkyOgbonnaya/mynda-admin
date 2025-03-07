import { PaginationParams } from "types/general.interface";
import { handleGetRequest } from "./http.service";
import { PaginationDataRes } from "types/http.type";
import { Booking } from "types/booking.interface";

export interface CreateBookings {
  bookingType?: string;
  message?: string;
  myndaId: string;
}

export const getBookings = async (paginationOptions: PaginationParams) => {
  return await handleGetRequest<PaginationDataRes<Booking[]>>(
    `/admins/bookings?page=${paginationOptions.page}&limit=${paginationOptions.limit}`
  );
};
