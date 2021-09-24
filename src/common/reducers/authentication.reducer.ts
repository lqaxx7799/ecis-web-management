import { Account, Agent, Company, Role } from '../../types/models';

export const AUTHENTICATION_AUTHENTICATED = 'AUTHENTICATION_AUTHENTICATED';
export const AUTHENTICATION_INIT = 'AUTHENTICATION_INIT';
export const AUTHENTICATION_LOG_OUT = 'AUTHENTICATION_LOG_OUT';

interface AuthenticationAuthenticated {
  type: typeof AUTHENTICATION_AUTHENTICATED;
  payload: {
    account: Account;
    role: Role;
    company?: Company | null;
    agent?: Agent | null;
  };
};

interface AuthenticationInit {
  type: typeof AUTHENTICATION_INIT;
  payload: {
    account?: Account | null;
    role?: Role | null;
    company?: Company | null;
    agent?: Agent | null;
  };
};

interface AuthenticationLogOut {
  type: typeof AUTHENTICATION_LOG_OUT;
}

export type AuthenticationActionTypes = 
  | AuthenticationAuthenticated
  | AuthenticationInit
  | AuthenticationLogOut;

export type AuthenticationState = {
  account?: Account | null;
  company?: Company | null;
  role?: Role | null;
  agent?: Agent | null;
  isInit: boolean;
};

const initialState: AuthenticationState = {
  account: null,
  role: null,
  company: null,
  isInit: false,
};

const authenticationReducer = (state = initialState, action: AuthenticationActionTypes): AuthenticationState => {
  switch (action.type) {
    case AUTHENTICATION_AUTHENTICATED:
      return {
        ...state,
        ...action.payload,
      };
    case AUTHENTICATION_INIT:
      return {
        ...state,
        ...action.payload,
        isInit: true,
      };
    case AUTHENTICATION_LOG_OUT:
      return {
        ...state,
        account: null,
        role: null,
        company: null,
        agent: null,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
