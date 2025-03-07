import { Agency } from "./agency.interface";
import { LaboratoryService } from "./laboratory.interface";
import { Mynda } from "./mynda.interface";

export interface InvoiceCreate {
  transportationFee: string;
  chargedFee: string;
  salary: string;
  labTest: string;
}

export interface Invoice {
  _id: string;
  transportationFee: number;
  salary: number;
  chargedFee: number;
  invoiceNumber: number;
  status: string;
  description: string;
  mynda: Mynda;
  agency:Agency,
  invoiceFor: string;
  labTest: LaboratoryService;
  createdAt: string;
  updatedAt: string;
  id: string;
}
