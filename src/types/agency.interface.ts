import {IFile} from './file.type';
import {User} from './user.type';

export interface AgencyPersonalDetails {
  profilePicture: IFile | null;
  nin: IFile | null;
  utilityBill: IFile | null;

  gender: string;
  dob: string;
  state: string;
  lga: string;
  religion: string;
  bvn: string;
  address: string;
}
export interface AgencyCompanyInfo {
  name: string;
  companyEmail: string;
  officeAddress: string;
  phoneNumber: string;
  services: string[];
  about: string;
  cac: IFile | null;
}
export interface Agency extends AgencyCompanyInfo, AgencyPersonalDetails {
  savedBy: string[];
  views: number;
  user: User;
  createdAt: string;
  updatedAt: string;
  id: string;
  _id: string;
}



export interface AgencyShareHolderCreate {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  shares: string;
  profilePhoto: IFile | null
  nin: IFile | null;
  role: string;
}

export interface AgencyShareHolder extends AgencyShareHolderCreate {
  _id:string;
  agency: string;
  createdAt: string;
  updatedAt: string
}
