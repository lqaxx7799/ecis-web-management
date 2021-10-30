import { ViolationReportDocument } from "./models";

export interface CompanyRegistrationDTO {
  email: string;
  companyCode: string;
  companyNameVI: string;
  companyNameEN: string;
};

export interface LogInDTO {
  email: string;
  password: string;
};

export interface UploadFileResponseDTO {
  name: string;
  type: string;
  size: number;
  url: string;
};

export interface VerificationConfirmRequirementDTO {
  scheduledTime: Date; 
  scheduledLocation: string;
  announceAgentDocumentContent: string;
  announceAgentDocumentUrl?: string;
  announceAgentDocumentType?: string;
  announceAgentDocumentSize?: number;
  announceAgentDocumentName?: string;
  isUsingAnnounceAgentFile?: boolean;
  verificationProcessId: number;
  assignedAgentId: string;
  verificationCriteriaId: number;
};

export interface VerificationConfirmUpdateDTO {
  verificationConfirmRequirementId: number;
  documentContent: string;
  documentUrl?: string;
  documentType?: string;
  documentSize?: number;
  documentName?: string;
  isUsingFile?: boolean;
  companyTypeId?: number;
};

export interface ViolationReportDTO {
  description: string;
  companyId: number; 
  reportAgentId: number; 
  violationReportDocuments: Partial<ViolationReportDocument>[];
};
