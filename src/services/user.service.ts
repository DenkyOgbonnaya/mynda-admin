import { PaginationDataRes, PaginationQuery } from "types/http.type";
import {
  handleGetRequest,
  handlePatchRequest,
  handlePostRequest,
  handlePutRequest,
} from "./http.service";
import {
  KycStatus,
  User,
  UserCreate,
  UserProfile,
  UserQuery,
  UserStat,
} from "types/user.type";
import {
  Education,
  Guarantor,
  IWorkExperience,
  MyndaCreate,
} from "types/mynda.interface";
import { AgencyShareHolder } from "types/agency.interface";
import { EmployerCreate } from "types/employer.interface";

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

export const getUserStat = async () => {
  return await handleGetRequest<UserStat>(`/admins/user-stat`);
};

export const createAgent = async (payload: UserCreate) => {
  return await handlePostRequest<UserCreate, null>("/admins/agency", payload);
};

export const updateMynda = async (userId: string, payload: MyndaCreate) => {
  return await handlePatchRequest<MyndaCreate, null>(
    `/admins/myndas/${userId}`,
    payload
  );
};

export const updateEmployer = async (
  userId: string,
  payload: EmployerCreate
) => {
  return await handlePatchRequest<EmployerCreate, null>(
    `/admins/employers/${userId}`,
    payload
  );
};
