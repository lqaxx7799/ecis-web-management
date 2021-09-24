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
