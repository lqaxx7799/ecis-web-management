import { VerificationProcess } from '../../types/models';
import request from '../utils/request';

function getAll(): Promise<VerificationProcess[]> {
  return request.get(`/VerificationProcess/GetAll`);
}

function getAllPending(): Promise<VerificationProcess[]> {
  return request.get(`/VerificationProcess/GetPending`);
}

function getAllSupport(): Promise<VerificationProcess[]> {
  return request.get(`/VerificationProcess/GetSupport`);
}

function getAllReviewed(): Promise<VerificationProcess[]> {
  return request.get(`/VerificationProcess/GetReviewed`);
}

function getAllClassified(): Promise<VerificationProcess[]> {
  return request.get(`/VerificationProcess/GetClassified`);
}

function getAllByCompany(companyId: number): Promise<VerificationProcess[]> {
  return request.get(`/VerificationProcess/GetByCompany/${companyId}`);
}

function getById(id: number): Promise<VerificationProcess> {
  return request.get(`/VerificationProcess/${id}`);
}

function getCurrentPendingByCompanyId(companyId: number): Promise<VerificationProcess> {
  return request.get(`/VerificationProcess/GetCurrentPending/${companyId}`);
}

function generate(companyId: number): Promise<VerificationProcess> {
  return request.post(`/VerificationProcess/Generate/${companyId}`);
}

function submitVerifyReview(id: number, assignedAgentId: number): Promise<VerificationProcess> {
  return request.put(`/VerificationProcess/SubmitReview/${id}?assignedAgentId=${assignedAgentId}`);
}

function submitClassify(id: number, companyTypeId: number): Promise<VerificationProcess> {
  return request.put(`/VerificationProcess/SubmitClassify/${id}?companyTypeId=${companyTypeId}`);
}

function update(data: Partial<VerificationProcess>): Promise<VerificationProcess> {
  return request.put(`/VerificationProcess/Update`, data);
}

function finishVerify(id: number): Promise<VerificationProcess> {
  return request.put(`/VerificationProcess/Finish/${id}`);
}

function rejectClassified(id: number): Promise<VerificationProcess> {
  return request.put(`/VerificationProcess/RejectClassified/${id}`);
}

const verificationProcessServices = {
  getAll,
  getAllPending,
  getAllByCompany,
  getAllSupport,
  getAllReviewed,
  getAllClassified,
  getById,
  getCurrentPendingByCompanyId,
  generate,
  submitVerifyReview,
  submitClassify,
  update,
  finishVerify,
  rejectClassified,
};

export default verificationProcessServices;
