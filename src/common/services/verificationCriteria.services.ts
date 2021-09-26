import { VerificationCriteria } from '../../types/models';
import request from '../utils/request';

function getAllByProcessId(processId: number): Promise<VerificationCriteria[]> {
  return request.get(`/VerificationCriteria/GetByProcessId/${processId}`);
}

function getById(id: number): Promise<VerificationCriteria> {
  return request.get(`/VerificationCriteria/${id}`);
}

function update(verificationCriteria: Partial<VerificationCriteria>): Promise<VerificationCriteria> {
  return request.put(`/VerificationCriteria/Update`, verificationCriteria);
}

const verificationCriteriaServices = {
  getAllByProcessId,
  getById,
  update,
};

export default verificationCriteriaServices;
