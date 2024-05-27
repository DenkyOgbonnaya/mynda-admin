export interface SubscriptionPlanFeature {
  name: string;
  description: string;
  available: boolean;
  _id: string;
}
export interface SubscriptionPlan {
  _id?: string;
  name: string;
  description: string;
  interval: string;
  role: string[];
  price: number;
  features: SubscriptionPlanFeature[];
  createdAt?: string;
  // updatedAt: string;
}

export interface SubscriptionInput {
  paymentMethod: string;
}
export interface AdPointsInput {
  paymentMethod: string;
  points: number
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
