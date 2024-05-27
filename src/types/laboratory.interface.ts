import {IFile} from './file.type';
import {User} from './user.type';

export interface Laboratory {
  logo: IFile;
  cac: IFile;
  _id: string;
  name: string;
  about: string;
  email: string;
  officeAddress: string;
  phoneNumber: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  id: string;
  state: '',
  lga: ''
}

export interface LaboratoryQuery {
  page: number;
  limit: number;
  search?: string;
}
export interface LaboratoryService {
  _id: string;
  description: string;
  services: string[];
  amount: number;
  laboratory: Laboratory;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface LabTestOrder {
  appointmentDate: string;
  labService: string;
  lab: string;
  user: string;
}

export interface LabTestOrderRes {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface LabServiceCreate {
  description: string;
  services: string[];
  amount: string;
}

export interface LaboratoryCreate {
  name: string;
  email: string;
  officeAddress: string;
  about: string;
  phoneNumber: string;
  cac:IFile | null
  logo: IFile | null,
  state?: string,
  lga?:string
}
