import { PaginationParams } from "types/general.interface";
import { Invoice, InvoiceCreate } from "../types/invoice.interface";
import { handleGetRequest, handlePostRequest } from "./http.service";
import { PaginationDataRes } from "types/http.type";

export const createInvoice = async (
  bookingId: string,
  payload: InvoiceCreate
) => {
  return await handlePostRequest<InvoiceCreate, null>(
    `/admins/invoices/bookings/${bookingId}`,
    payload
  );
};

export const getInvoices = async (pageParam: PaginationParams) => {
  return await handleGetRequest<PaginationDataRes<Invoice>>(
    `/admins/invoices?page=${pageParam.page}&limit=${pageParam.limit}`
  );
};

export const getInvoicesDetails = async (InvoiceId: string) => {
  return await handleGetRequest<Invoice>(`/admins/invoices/${InvoiceId}`);
};
