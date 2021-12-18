import { AgentCreateDTO } from '../../types/dto';
import { Agent, AgentAssignment } from '../../types/models';
import request from '../utils/request';

function getAll(): Promise<Agent[]> {
  return request.get(`/Agent/GetAll`);
}

function getAllAgents(): Promise<Agent[]> {
  return request.get(`/Agent/GetAllAgents`);
}

function getByAccountId(accountId: number): Promise<Agent> {
  return request.get(`/Agent/ByAccount/${accountId}`);
}

function getById(id: number): Promise<Agent> {
  return request.get(`/Agent/ById/${id}`);
}

function getAssignmentByAgentId(agentId: number): Promise<AgentAssignment[]> {
  return request.get(`/Agent/GetAssignments/${agentId}`);
}

function create(payload: AgentCreateDTO): Promise<Agent> {
  return request.post('/Agent/Add', payload);
}

const agentServices = {
  getAll,
  getAllAgents,
  getByAccountId,
  getById,
  getAssignmentByAgentId,
  create,
};

export default agentServices;
