import { IFile } from "./file.type";
import { Mynda } from "./mynda.interface";
import { JobPlan } from "./subscription.interface";
import { User } from "./user.type";

export interface Booking {
  _id: string;
  mynda: Mynda;
  bookedBy: User;
  job?: Job;
  agency?: string;
  createdAt: string;
  invoiced: boolean;
  bookingType: string;
  message?: string;
}

export interface Job {
  coverPhoto?: IFile;
  _id?: string;
  jobType?: string;
  title?: string;
  category?: string;
  location?: string;
  employmentType?: string;
  description?: string;
  requiredSkills?: string[];
  requiredExperience?: number;
  isOpen?: boolean;
  endDate?: string;
  salary?: number;
  savedBy?: string[];
  appliedBy?: string[];
  views?: number;
  owner?: User;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  ownerType?: string;
  activePlan?: JobPlan;
  reviewedBy?: string;
  area?: string;
  expectedStartDate?: string;
}
