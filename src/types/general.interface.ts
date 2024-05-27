import { User } from "./user.type";

export interface Role {
  _id?:string
  name: string;
  title: string;
  description: string;
  coverPhoto?: string;
}

export interface ServiceCategory {
  coverPhoto?: {
    name: string;
    url: string;
    id: string;
    size: number;
  };
  _id?: string;
  name: string;
  description: string;
}

export interface Skill {
  _id: string;
  name: string;
  serviceCategory: string;
}

export interface SkillCreate {
  name: string;
  serviceCategory?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface CategoryJobCount {
  _id: string;
  name: string;
  jobCount: number;
}

export interface ReviewCreate {
rating: number;
review: string
}
export interface Review extends ReviewCreate {
  _id: string;
  job: string;
  reviewBy: User;
  createdAt: string
  updatedAt: string
}

export interface InitializePaymentRes {
  authorization_url: string;
  access_code: string;
  reference: string;
};
