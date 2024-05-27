import {IFile} from './file.type';
import {User} from './user.type';

export interface MyndaCreate {
  title: string;
  about: string;
  gender: string;
  dob: string;
  state: string;
  lga: string;
  religion: string;
  occupation: string[];
  skills: string[];
  address: string;
  stateCoverage: string[];
  salaryExpectations: string;
  disabilities: string[];
  allegies: string[];
  employmentType: string;
  height?: string;
  userId?: string;
}

export interface MyndaIdentity {
  profilePicture: IFile | null;
  docType: string;
  document: IFile | null;
  docNumber: string;
}

export interface MyndaRegistrationInput extends MyndaCreate, MyndaIdentity {}

export interface IWorkExperience {
  _id?: string;
  title: string;
  employmentType: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  currentWork: boolean;
  user: string;
  state: string;
  lga: string;
}

export interface EducationCreate {
  level: string;
  startDate: string;
  endDate: string;
  currentSchool: false;
  school: string;
}

export interface Education extends EducationCreate {
  _id: string;
}

export interface Guarantor {
  fullName: string;
  email: string;
  address: string;
  occupation: string;
  relationship: string;
  phone: string;
}

export interface Mynda extends MyndaCreate, MyndaIdentity {
  savedBy: string[];
  bookedBy: string[];
  views: 0;
  user: User;
  createdAt: string;
  updatedAt: string;
  id: string;
  _id: string;
  cv?: IFile;
}
