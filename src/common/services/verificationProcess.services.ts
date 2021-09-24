import { VerificationProcess } from '../../types/models';
import request from '../utils/request';

function getAllByCompany(companyId: number): Promise<VerificationProcess[]> {
  return request.get(`/VerificationProcess/GetByCompany/${companyId}`);
}

function getById(id: number): Promise<VerificationProcess> {
  return request.get(`/VerificationProcess/${id}`);
}

const verificationProcessServices = {
  getAllByCompany,
  getById,
};

export default verificationProcessServices;
