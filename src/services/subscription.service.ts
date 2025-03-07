import {
  handleDeleteRequest,
  handleGetRequest,
  handlePostRequest,
  handlePutRequest,
} from "./http.service";
import {
  IServicePlan,
  JobPlan,
  ServicePlanCreate,
  SubscriptionPlan,
} from "types/subscription.interface";

export const getSubscriptionPlans = async (role: string) => {
  return await handleGetRequest<SubscriptionPlan[]>(
    `/subscription-plans/roles/${role}`
  );
};
export const addSubPlan = async (plan: SubscriptionPlan) => {
  return await handlePostRequest<SubscriptionPlan, null>(
    `/subscription-plans`,
    plan
  );
};

export const getSubscriptionPlan = async (name: string) => {
  return await handleGetRequest<SubscriptionPlan>(
    `/subscription-plans/${name}`
  );
};
export const editSubPlan = async (id: string, plan: SubscriptionPlan) => {
  return await handlePutRequest<SubscriptionPlan, null>(
    `/subscription-plans/${id}`,
    plan
  );
};

export const deleteSubPlan = async (id: string) => {
  return await handleDeleteRequest(`/subscription-plans/${id}`);
};

export const getJobPlans = async () => {
  return await handleGetRequest<JobPlan[]>(`/job-plans`);
};

export const addJobPlan = async (plan: JobPlan) => {
  return await handlePostRequest<JobPlan, null>(`/job-plans`, plan);
};

export const editJobPlan = async (id: string, plan: JobPlan) => {
  return await handlePutRequest<JobPlan, null>(`/job-plans/${id}`, plan);
};

export const deleteJobPlan = async (id: string) => {
  return await handleDeleteRequest(`/job-plans/${id}`);
};

// mynda service plans

export const getServicePlans = async () => {
  return await handleGetRequest<IServicePlan[]>(`/service-plans`);
};

export const addServicePlan = async (plan: ServicePlanCreate) => {
  return await handlePostRequest<ServicePlanCreate, null>(
    `/service-plans`,
    plan
  );
};

export const editServicePlan = async (id: string, plan: IServicePlan) => {
  return await handlePutRequest<IServicePlan, null>(
    `/service-plans/${id}`,
    plan
  );
};

export const deleteServicePlan = async (id: string) => {
  return await handleDeleteRequest(`/service-plans/${id}`);
};
