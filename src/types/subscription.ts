
export interface PlanFeature {
  id: string;
  description: string;
  isAvailable: boolean;
}
export interface SubscriptionPlan {
  name: string;
  price: number;
  duration: string;
  featureLogo: any;
  features: PlanFeature[];
}
