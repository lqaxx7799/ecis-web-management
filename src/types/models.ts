export interface BaseModel {
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface Account {
  id: number;
  email: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  roleId: number;
};

export interface Role {
  id: number;
  roleName: string;
  description: string;
};

export interface CriteriaType extends BaseModel {
  id: number;
  criteriaTypeName: string;
  description: string;
};

export interface Criteria extends BaseModel {
  id: number;
  criteriaName: string;
  description: string;
  criteriaTypeId: number;
};

export interface Company extends BaseModel {
  id: number;
  companyCode: string;
  companyNameVI: string;
  companyNameEN: string;
  accountId: number;
  companyTypeId: number;
  isVerified: boolean;

  companyType: CompanyType;
};

export interface CompanyType extends BaseModel {
  id: number;
  typeName: string;
  description: string;
};

export interface VerificationProcess extends BaseModel {
  id: number;
  submitDeadline?: Date;
  submittedAt?: Date;
  reviewedAt?: Date;
  validFrom?: Date;
  validTo?: Date;
  isOpenedByAgent: boolean;
  isSubmitted: boolean;
  isReviewed: boolean;
  submitMethod: string;
  companyTypeId?: number;
  assignedAgentId?: number;
  companyId: number;
  company: Company;
};

export interface VerificationCriteria extends BaseModel {
  id: number;
  approvedStatus?: string;
  verificationProcessId?: number;
  criteriaId?: number;
};

export interface VerificationDocument extends BaseModel {
  id: number;
  content: string;
  documentName: string;
  resourceType: string;
  resourceSize: number;
  resourceUrl: string;
  uploaderType: string;
  verificationCriteriaId: number;
};

export interface DocumentReview extends BaseModel {
  id: number;
  content: string;
  verificationDocumentId: number;
};

export interface Agent extends BaseModel {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  accountId: number;
};

export interface VerificationConfirmRequirement extends BaseModel {
  id: number; 
  scheduledTime: Date;
  scheduledLocation: string; 
  announcedAgentAt?: Date; 
  announcedCompanyAt?: Date;
  confirmedAt?: Date; 

  announceAgentDocumentContent?: string;
  announceAgentDocumentUrl?: string;
  announceAgentDocumentType?: string;
  announceAgentDocumentSize?: number;
  announceAgentDocumentName?: string;
  isUsingAnnounceAgentFile: boolean;

  announceCompanyDocumentContent?: string;
  announceCompanyDocumentUrl?: string;
  announceCompanyDocumentType?: string;
  announceCompanyDocumentSize?: number;
  announceCompanyDocumentName?: string;
  isUsingAnnounceCompanyFile: boolean;

  confirmDocumentContent?: string;
  confirmDocumentUrl?: string;
  confirmDocumentType?: string;
  confirmDocumentSize?: number;
  confirmDocumentName?: string;
  isUsingConfirmFile: boolean;

  verificationProcessId: number;
  assignedAgentId: number;
  confirmCompanyTypeId: number;
};

export interface CompanyTypeModification extends BaseModel {
  id: number;
  modification: string;
  isAnnounced: boolean;
  companyId: number;
  previousCompanyTypeId: number;
  updatedCompanyTypeId: number;
  verificationProcessId: number;
  companyReportId: number;
  modificationTypeId: number;
  company: Company;
  updatedCompanyType: CompanyType;
};

export interface ViolationReport extends BaseModel {
  id: number;
  description: string;
  status: string;
  approvedAt?: Date;
  companyId: number;
  reportAgentId: number;

  company: Company;
};

export interface ViolationReportDocument extends BaseModel {
  id: number;
  documentType: string;
  documentUrl: string;
  documentName: string;
  documentSize: number;
  violationReportId: number;
};
