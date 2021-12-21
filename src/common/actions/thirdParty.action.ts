import { AppDispatch } from '../../app/store';
import { ThirdPartyRegisterDTO } from '../../types/dto';
import { ThirdParty } from '../../types/models';
import { ThirdPartyActionTypes } from '../reducers/thirdParty.reducer';
import thirdPartyServices from '../services/thirdParty.services';
import { AppThunk } from './type';

function getAll(): AppThunk<Promise<ThirdParty[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<ThirdPartyActionTypes>({
      type: 'THIRD_PARTY_LOADING',
    });
    try {
      const result = await thirdPartyServices.getAll();
      dispatch<ThirdPartyActionTypes>({
        type: 'THIRD_PARTY_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<ThirdPartyActionTypes>({
        type: 'THIRD_PARTY_LOAD_FAILED',
      });
      return [];
    }
  };
}

function getById(id: number): AppThunk<Promise<ThirdParty>> {
  return async (dispatch: AppDispatch) => {
    dispatch<ThirdPartyActionTypes>({
      type: 'THIRD_PARTY_LOADING',
    });
    try {
      const thirdParty = await thirdPartyServices.getById(id);
      dispatch<ThirdPartyActionTypes>({
        type: 'THIRD_PARTY_DETAIL_LOADED',
        payload: thirdParty,
      });
      return thirdParty;
    } catch (e) {
      dispatch<ThirdPartyActionTypes>({
        type: 'THIRD_PARTY_LOAD_FAILED',
      });
      throw e;
    }
  };
}

function create(payload: ThirdPartyRegisterDTO): AppThunk<Promise<ThirdParty>> {
  return (dispatch: AppDispatch) => {
    return thirdPartyServices.create(payload);
  };
}

function activate(id: number): AppThunk<Promise<ThirdParty>> {
  return async (dispatch: AppDispatch) => {
    const thirdParty = await thirdPartyServices.activate(id);
    dispatch<ThirdPartyActionTypes>({
      type: 'THIRD_PARTY_DETAIL_LOADED',
      payload: thirdParty,
    });
    return thirdParty;
  };
}

function deactivate(id: number): AppThunk<Promise<ThirdParty>> {
  return async (dispatch: AppDispatch) => {
    const thirdParty = await thirdPartyServices.deactivate(id);
    dispatch<ThirdPartyActionTypes>({
      type: 'THIRD_PARTY_DETAIL_LOADED',
      payload: thirdParty,
    });
    return thirdParty;
  };
}

const thirdPartyActions = {
  getAll,
  getById,
  create,
  activate,
  deactivate,
};

export default thirdPartyActions;
