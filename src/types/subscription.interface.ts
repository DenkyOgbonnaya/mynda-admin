export interface SubscriptionPlanFeature {
  name: string;
  description: string;
  available: boolean;
  _id?: string;
}
export interface SubscriptionPlan {
  _id?: string;
  name: string;
  description: string;
  duration: number;
  role: string[];
  price: number;
  interval: string;
  features: SubscriptionPlanFeature[];
  createdAt?: string;
}

export interface SubscriptionInput {
  paymentMethod: string;
}
export interface AdPointsInput {
  paymentMethod: string;
  points: number;
}

export interface JobPlan {
  _id?: string;
  name: string;
  description: string;
  interval: string;
  numberOfAds: number;
  price: number;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}

export interface ServicePlanCreate {
  name: string;
  interval: number;
  price: number;
}

export interface IServicePlan extends ServicePlanCreate {
  _id?: string;

  createdAt?: string;
  updatedAt?: string;
  id?: string;
}
