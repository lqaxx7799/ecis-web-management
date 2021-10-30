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

function submitVerifyReview(id: number): Promise<VerificationProcess> {
  return request.put(`/VerificationProcess/SubmitReview/${id}`);
}

function update(data: Partial<VerificationProcess>): Promise<VerificationProcess> {
  return request.put(`/VerificationProcess/Update`, data);
}

function finishVerify(id: number): Promise<VerificationProcess> {
  return request.put(`/VerificationProcess/Finish/${id}`);
}

const verificationProcessServices = {
  getAll,
  getAllPending,
  getAllByCompany,
  getAllSupport,
  getAllReviewed,
  getById,
  getCurrentPendingByCompanyId,
  generate,
  submitVerifyReview,
  update,
  finishVerify,
};

export default verificationProcessServices;
