import { Agent } from '../../types/models';
import request from '../utils/request';

function getByAccountId(accountId: number): Promise<Agent> {
  return request.get(`/Agent/ByAccount/${accountId}`);
}

const agentServices = {
  getByAccountId,
};

export default agentServices;
