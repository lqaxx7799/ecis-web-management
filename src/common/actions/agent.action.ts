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

function getById(id: number): AppThunk<Promise<Agent>> {
  return async (dispatch: AppDispatch) => {
    dispatch<AgentActionTypes>({
      type: 'AGENT_LOADING',
    });
    try {
      const [agent, assignments] = await Promise.all([
        agentServices.getById(id),
        agentServices.getAssignmentByAgentId(id),
      ]);
      dispatch<AgentActionTypes>({
        type: 'AGENT_DETAIL_LOADED',
        payload: {
          agent,
          assignments,
        },
      });
      return agent;
    } catch (e) {
      dispatch<AgentActionTypes>({
        type: 'AGENT_LOAD_FAILED',
      });
      throw e;
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
  getById,
  create,
};

export default agentActions;
