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

function submitVerifyReview(id: number): Promise<VerificationProcess> {
  return request.put(`/VerificationProcess/SubmitReview/${id}`);
}

function update(data: Partial<VerificationProcess>): Promise<VerificationProcess> {
  return request.put(`/VerificationProcess/Update`, data);
}

const verificationProcessServices = {
  getAll,
  getAllPending,
  getAllByCompany,
  getAllSupport,
  getAllReviewed,
  getById,
  submitVerifyReview,
  update,
};

export default verificationProcessServices;
