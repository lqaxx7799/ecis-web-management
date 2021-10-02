import { Agent } from "../../types/models";

export const AGENT_LOADING = 'AGENT_LOADING';
export const AGENT_LOADED = 'AGENT_LOADED';
export const AGENT_LOAD_FAILED = 'AGENT_LOAD_FAILED';

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

export type AgentActionTypes = 
  | AgentLoading
  | AgentLoaded
  | AgentLoadFailed;

export type AgentState = {
  loading: boolean;
  agents: Agent[];
};

const initialState: AgentState =  {
  loading: false,
  agents: []
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
    default:
      return state;
  }
};

export default agentReducer;
