import {
  Role,
  ServiceCategory,
  Skill,
  SkillCreate,
} from "types/general.interface";
import {
  handleDeleteRequest,
  handleGetRequest,
  handlePostRequest,
  handlePutRequest,
} from "./http.service";

export const getUserRoles = async () => {
  return await handleGetRequest<Role[]>("/roles");
};

export const getServiceCategories = async () => {
  return await handleGetRequest<ServiceCategory[]>("/service-category");
};

export const addServiceCategories = async (serviceCat: ServiceCategory) => {
  return await handlePostRequest<ServiceCategory, null>(
    "/service-category",
    serviceCat
  );
};
export const getSkills = async (serviceCategory: string) => {
  return await handleGetRequest<Skill[]>(`/skills/any`);
};

export const addSkill = async (payload: SkillCreate) => {
  return await handlePostRequest<SkillCreate, null>("/skills", payload);
};

export const deleteSkill = async (id: string) => {
  return await handleDeleteRequest<null>(`/skills/${id}`);
};

export const addRole = async (payload: Role) => {
  return await handlePostRequest<Role, null>("/roles", payload);
};
export const deleteRole = async (id: string) => {
  return await handleDeleteRequest<null>(`/roles/${id}`);
};

export const editRole = async (id: string, plan: Role) => {
  return await handlePutRequest<Role, null>(`/roles/${id}`, plan);
};

export const deleteCategory = async (id: string) => {
  return await handleDeleteRequest<null>(`/service-category/${id}`);
};

export const editCategory = async (id: string, record: ServiceCategory) => {
  return await handlePutRequest<ServiceCategory, null>(
    `/service-category/${id}`,
    record
  );
};

export const editSkill = async (id: string, record: SkillCreate) => {
  return await handlePutRequest<SkillCreate, null>(`/skills/${id}`, record);
};
