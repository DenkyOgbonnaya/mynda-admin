
import {
  SubscriptionPlan,
  // JobPlan
} from 'types/subscription';
import {handleGetRequest, handlePostRequest} from './http.service';
import { JobPlan } from 'types/subscription.interface';

export const getSubscriptionPlans = async (role: string) => {
  return await handleGetRequest<SubscriptionPlan[]>(
    `/subscription-plans/roles/${role}`,
  );
};

export const getSubscriptionPlan = async (name: string) => {
  return await handleGetRequest<SubscriptionPlan>(
    `/subscription-plans/${name}`,
  );
};


export const getJobPlans = async () => {
  return await handleGetRequest<JobPlan[]>(`/job-plans`);
};

export const addJobPlan = async (plan:JobPlan) => {
  return await handlePostRequest<JobPlan, null>(`/job-plans`,plan);
};


