import Cookies from "js-cookie";
import { LogInDTO } from "../../types/dto";
import request from "../utils/request";
import { store } from "../../app/store";

function isLoggedIn(roles: string[] | undefined): boolean {
  const state = store.getState();
  const { isInit, account, role } = state.authentication;
  if (!isInit) {
    return true;
  }
  if (!account) {
    return false;
  }
  if (roles) {
    return roles.includes(role?.roleName ?? '');
  }
  return true;
}

function validate() {
  return request.get('/Authentication/Validate');
}

function authenticate(payload: LogInDTO) {
  return request.post('/Authentication/AuthenticateManagement', payload);
}

function getToken() {
  return Cookies.get('appToken');
}

function setToken(token: string) {
  Cookies.set('appToken', token);
}

function removeToken() {
  Cookies.remove('appToken');
}

const authenticationServices = {
  authenticate,
  validate,
  isLoggedIn,
  getToken,
  setToken,
  removeToken,
};

export default authenticationServices;
