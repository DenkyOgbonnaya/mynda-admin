import { PaginationDataRes, PaginationQuery } from "types/http.type";
import { handleGetRequest, handlePutRequest } from "./http.service";
import { KycStatus, User, UserProfile, UserQuery } from "types/user.type";
import { Education, Guarantor, IWorkExperience } from "types/mynda.interface";
import { AgencyShareHolder } from "types/agency.interface";

export const getUsers = async (query: UserQuery) => {
  return await handleGetRequest<PaginationDataRes<User[]>>(
    `/admins/users?page=${query.page}&limit=${query.limit}&search=${query.search}`
  );
};

export const getUserProfile = async (userId: string) => {
  return await handleGetRequest<UserProfile>(`/admins/users/${userId}/profile`);
};

export const getEducation = async (userId: string) => {
  return await handleGetRequest<Education[]>(
    `/admins/users/${userId}/education`
  );
};

export const getWorkExperience = async (userId: string) => {
  return await handleGetRequest<IWorkExperience[]>(
    `/admins/users/${userId}/work-experience`
  );
};

export const getGuarantor = async (userId: string) => {
  return await handleGetRequest<Guarantor>(`/admins/users/${userId}/guarantor`);
};

export const getShareholder = async (userId: string) => {
  return await handleGetRequest<AgencyShareHolder>(
    `/admins/users/${userId}/share-holder`
  );
};

export const verifyUser = async (
  userId: string,
  input: { status: string; comment: string }
) => {
  return await handlePutRequest<{ status: string; comment: string }, null>(
    `/admins/users/${userId}/verify-account`,
    input
  );
};
