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

function getAllByCompany(companyId: number): Promise<VerificationProcess[]> {
  return request.get(`/VerificationProcess/GetByCompany/${companyId}`);
}

function getById(id: number): Promise<VerificationProcess> {
  return request.get(`/VerificationProcess/${id}`);
}

const verificationProcessServices = {
  getAll,
  getAllPending,
  getAllByCompany,
  getAllSupport,
  getById,
};

export default verificationProcessServices;
