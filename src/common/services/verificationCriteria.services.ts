import { VerificationCriteria } from '../../types/models';
import request from '../utils/request';

function getAllByProcessId(processId: number): Promise<VerificationCriteria[]> {
  return request.get(`/VerificationCriteria/GetByProcessId/${processId}`);
}

function getById(id: number): Promise<VerificationCriteria> {
  return request.get(`/VerificationCriteria/${id}`);
}

const verificationCriteriaServices = {
  getAllByProcessId,
  getById,
};

export default verificationCriteriaServices;
