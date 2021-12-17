import { AgentCreateDTO } from '../../types/dto';
import { Agent } from '../../types/models';
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

function create(payload: AgentCreateDTO): Promise<Agent> {
  return request.post('/Agent/Add', payload);
}

const agentServices = {
  getAll,
  getAllAgents,
  getByAccountId,
  create,
};

export default agentServices;
