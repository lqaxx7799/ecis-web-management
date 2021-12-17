import { AppDispatch } from '../../app/store';
import { AgentCreateDTO } from '../../types/dto';
import { Agent } from '../../types/models';
import { AgentActionTypes } from '../reducers/agent.reducer';
import agentServices from '../services/agent.services';
import { AppThunk } from './type';

function getAll(): AppThunk<Promise<Agent[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<AgentActionTypes>({
      type: 'AGENT_LOADING',
    });
    try {
      const result = await agentServices.getAll();
      dispatch<AgentActionTypes>({
        type: 'AGENT_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<AgentActionTypes>({
        type: 'AGENT_LOAD_FAILED',
      });
      return [];
    }
  };
}

function getAllAgents(): AppThunk<Promise<Agent[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<AgentActionTypes>({
      type: 'AGENT_LOADING',
    });
    try {
      const result = await agentServices.getAllAgents();
      dispatch<AgentActionTypes>({
        type: 'AGENT_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<AgentActionTypes>({
        type: 'AGENT_LOAD_FAILED',
      });
      return [];
    }
  };
}

function create(payload: AgentCreateDTO): AppThunk<Promise<Agent>> {
  return (dispatch: AppDispatch) => {
    return agentServices.create(payload);
  };
}

const agentActions = {
  getAll,
  getAllAgents,
  create,
};

export default agentActions;
