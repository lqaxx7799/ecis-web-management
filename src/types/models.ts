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
