import { Agency } from "./agency.interface";
import { Employer } from "./employer.interface";
import { IFile } from "./file.type";
import { PaginationQuery } from "./http.type";
import { Laboratory } from "./laboratory.interface";
import { Mynda } from "./mynda.interface";

export type KycStatus = "Approved" | "Pending" | "In Review" | "Rejected";
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  accountVerified?: boolean;
  subscriptionPlan?: string;
  subscriptionExpiration?: Date;
  status?: string;
  lastLoggedIn?: Date;
  lastNotificationView?: Date;
  completedKyc?: boolean;
  kycStatus: KycStatus;
  advertPoints?: number;
  fcmToken?: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
}

export interface UserProfile {
  user: User;
  profilePicture?: IFile;
  mynda: Mynda;
  employer: Employer;
  agency: Agency;
  laboratory: Laboratory;
}

export interface UserQuery extends PaginationQuery {
  search?: string;
}
