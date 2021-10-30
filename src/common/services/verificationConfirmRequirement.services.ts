import { VerificationConfirmRequirementDTO, VerificationConfirmUpdateDTO } from '../../types/dto';
import { VerificationConfirmRequirement } from '../../types/models';
import request from '../utils/request';

function getAssignedPending(agentId: number): Promise<VerificationConfirmRequirement[]> {
  return request.get(`/VerificationConfirmRequirement/AssignedPending/${agentId}`);
}

function getAssignedFinished(agentId: number): Promise<VerificationConfirmRequirement[]> {
  return request.get(`/VerificationConfirmRequirement/AssignedFinished/${agentId}`);
}

function getByProcessId(processId: number): Promise<VerificationConfirmRequirement> {
  return request.get(`/VerificationConfirmRequirement/ByProcessId/${processId}`);
}

function getById(id: number): Promise<VerificationConfirmRequirement> {
  return request.get(`/VerificationConfirmRequirement/ById/${id}`);
}

function create(data: Partial<VerificationConfirmRequirement>): Promise<VerificationConfirmRequirement> {
  return request.post(`/VerificationConfirmRequirement/Create`, data);
}

function announceCompany(data: VerificationConfirmUpdateDTO): Promise<VerificationConfirmRequirement> {
  return request.put(`/VerificationConfirmRequirement/AnnounceCompany`, data);
}

function finishConfirm(data: VerificationConfirmUpdateDTO): Promise<VerificationConfirmRequirement> {
  return request.put(`/VerificationConfirmRequirement/FinishConfirm`, data);
}

const verificationConfirmRequirementServices = {
  getAssignedPending,
  getAssignedFinished,
  getByProcessId,
  getById,
  create,
  announceCompany,
  finishConfirm,
};

export default verificationConfirmRequirementServices;
