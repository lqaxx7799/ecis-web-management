import { AppActions, AppDispatch } from "../../app/store";
import { LogInDTO } from "../../types/dto";
import { Account } from "../../types/models";
import { AuthenticationActionTypes } from "../reducers/authentication.reducer";
import agentServices from "../services/agent.services";
import authenticationServices from "../services/authentication.services";
import companyServices from "../services/company.services";
import roleServices from "../services/role.services";
import { AppThunk } from "./type";

function authenticate(payload: LogInDTO): AppThunk<Promise<Account>> {
  return async (dispatch: AppDispatch) => {
    try {
      const account = await authenticationServices.authenticate(payload) as Account & {
        token: string;
      };
      authenticationServices.setToken(account.token);

      const role = await roleServices.getById(account.roleId);
      let company, agent;
      if (role.roleName === 'Company') {
        company = await companyServices.getByAccountId(account.id);
      } else if (role.roleName === 'Agent') {
        agent = await agentServices.getByAccountId(account.id);
      }

      dispatch<AuthenticationActionTypes>({
        type: 'AUTHENTICATION_AUTHENTICATED',
        payload: {
          account,
          role,
          company,
          agent,
        },
      });
      return account;
    } catch (e) {
      throw e;
    }
  }
}

function validate(): AppThunk<Promise<Account>> {
  return async (dispatch: AppDispatch) => {
    try {
      const account = await authenticationServices.validate() as Account;

      const role = await roleServices.getById(account.roleId);
      let company, agent;
      if (role.roleName === 'Company') {
        company = await companyServices.getByAccountId(account.id);
      } else if (role.roleName === 'Agent') {
        agent = await agentServices.getByAccountId(account.id);
      }

      dispatch<AuthenticationActionTypes>({
        type: 'AUTHENTICATION_INIT',
        payload: {
          account,
          role,
          company,
          agent,
        },
      });
 
      return account;
    } catch (e) {
      dispatch<AuthenticationActionTypes>({
        type: 'AUTHENTICATION_INIT',
        payload: {},
      });
      throw e;
    }
  } 
}

function logOut(): AppThunk<void> {
  return (dispatch: AppDispatch) => {
    dispatch<AuthenticationActionTypes>({
      type: 'AUTHENTICATION_LOG_OUT',
    });
    authenticationServices.removeToken();
    window.location.reload();
  }
}

const authenticationActions = {
  authenticate,
  validate,
  logOut,
};

export default authenticationActions;
