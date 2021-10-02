import { Agent } from '../../types/models';
import request from '../utils/request';

function getAll(): Promise<Agent[]> {
  return request.get(`/Agent/GetAll`);
}

function getByAccountId(accountId: number): Promise<Agent> {
  return request.get(`/Agent/ByAccount/${accountId}`);
}

const agentServices = {
  getAll,
  getByAccountId,
};

export default agentServices;
