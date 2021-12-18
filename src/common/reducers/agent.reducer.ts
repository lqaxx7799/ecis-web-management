import { Agent, AgentAssignment } from "../../types/models";

export const AGENT_LOADING = 'AGENT_LOADING';
export const AGENT_LOADED = 'AGENT_LOADED';
export const AGENT_LOAD_FAILED = 'AGENT_LOAD_FAILED';
export const AGENT_DETAIL_LOADED = 'AGENT_DETAIL_LOADED';

interface AgentLoading {
  type: typeof AGENT_LOADING;
};

interface AgentLoaded {
  type: typeof AGENT_LOADED;
  payload: Agent[];
};

interface AgentLoadFailed {
  type: typeof AGENT_LOAD_FAILED;
};

interface AgentDetailLoaded {
  type: typeof AGENT_DETAIL_LOADED;
  payload: {
    agent: Agent,
    assignments: AgentAssignment[],
  };
};

export type AgentActionTypes = 
  | AgentLoading
  | AgentLoaded
  | AgentLoadFailed
  | AgentDetailLoaded;

export type AgentState = {
  loading: boolean;
  agents: Agent[];
  editingAgent?: Agent;
  assignments: AgentAssignment[];
};

const initialState: AgentState =  {
  loading: false,
  agents: [],
  editingAgent: undefined,
  assignments: [],
};

const agentReducer = (state = initialState, action: AgentActionTypes): AgentState => {
  switch (action.type) {
    case AGENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AGENT_LOADED:
      return {
        ...state,
        loading: false,
        agents: action.payload,
      };
    case AGENT_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    case AGENT_DETAIL_LOADED:
      return {
        ...state,
        editingAgent: action.payload.agent,
        assignments: action.payload.assignments,
        loading: false,
      };
    default:
      return state;
  }
};

export default agentReducer;
