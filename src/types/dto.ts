import { VerificationConfirmDocument, ViolationReportDocument } from "./models";

export interface CompanyRegistrationDTO {
  email: string;
  companyCode: string;
  companyNameVI: string;
  companyNameEN: string;
  provinceId: number;
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
  verificationProcessId: number;
  assignedAgentId: number;
  verificationCriteriaId: number;
};

export interface VerificationConfirmUpdateDTO {
  verificationConfirmRequirementId: number;
  documentContent: string;
  documentUrl?: string;
  documentType?: string;
  documentSize?: number;
  documentName?: string;
  verificationConfirmDocuments: Partial<VerificationConfirmDocument>[];
};

export interface ViolationReportDTO {
  description: string;
  companyId: number; 
  reportAgentId: number; 
  violationReportDocuments: Partial<ViolationReportDocument>[];
};

export interface VerificationProcessRatingDTO {
  verificationProcessId: number;
  pendingCount: number;
  verifiedCount: number;
  rejectedCount: number;
  totalCount: number;
};

export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
  reenterNewPassword: string;
};

export interface AgentCreateDTO {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  address: string;
  dateOfBirth: string;
  provinceIds: number[];
};
