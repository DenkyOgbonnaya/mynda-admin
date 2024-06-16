import { IFile } from "./file.type";

export interface EmployerUpdate {
  gender: string;
  residentialAddress: string;
  address: string;
  dob: string;
  religion?: string;
}

export interface EmployerCreate extends EmployerUpdate {
  state: string;
  lga: string;
  profilePicture: IFile | null;
  nin: IFile | null;
  utilityBill: IFile | null;
  driversLicence: IFile | null;
  bvn: string;
  docType: string;
  docNumber: string;
  document: IFile | null;
}

export interface Employer extends EmployerCreate {
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
