import { AppDispatch } from '../../app/store';
import { VerificationProcessRatingDTO } from '../../types/dto';
import { VerificationProcess } from '../../types/models';
import { VerificationProcessActionTypes } from '../reducers/verificationProcess.reducer';
import verificationProcessServices from '../services/verificationProcess.services';
import { AppThunk } from './type';

function getAll(): AppThunk<Promise<VerificationProcess[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationProcessActionTypes>({
      type: 'VERIFICATION_PROCESS_LOADING',
    });
    try {
      const result = await verificationProcessServices.getAll();
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOAD_FAILED',
      });
      return [];
    }
  };
}

function getAllPending(): AppThunk<Promise<VerificationProcess[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationProcessActionTypes>({
      type: 'VERIFICATION_PROCESS_LOADING',
    });
    try {
      const result = await verificationProcessServices.getAllPending();
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOAD_FAILED',
      });
      return [];
    }
  };
}

function getAllByCompany(companyId: number): AppThunk<Promise<VerificationProcess[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationProcessActionTypes>({
      type: 'VERIFICATION_PROCESS_LOADING',
    });
    try {
      const result = await verificationProcessServices.getAllByCompany(companyId);
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOAD_FAILED',
      });
      return [];
    }
  };
}

function getAllSupport(): AppThunk<Promise<VerificationProcess[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationProcessActionTypes>({
      type: 'VERIFICATION_PROCESS_LOADING',
    });
    try {
      const result = await verificationProcessServices.getAllSupport();
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOAD_FAILED',
      });
      return [];
    }
  };
}

function getAllReviewed(): AppThunk<Promise<VerificationProcess[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationProcessActionTypes>({
      type: 'VERIFICATION_PROCESS_LOADING',
    });
    try {
      const result = await verificationProcessServices.getAllReviewed();
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOAD_FAILED',
      });
      return [];
    }
  };
}

function getAllClassified(): AppThunk<Promise<VerificationProcess[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationProcessActionTypes>({
      type: 'VERIFICATION_PROCESS_LOADING',
    });
    try {
      const result = await verificationProcessServices.getAllClassified();
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOAD_FAILED',
      });
      return [];
    }
  };
}

function getRatingCount(processIds: number[]): AppThunk<Promise<VerificationProcessRatingDTO[]>> {
  return async (dispatch: AppDispatch) => {
    const result = await verificationProcessServices.getRatingCount(processIds);
    return result;
  };
}

function generate(companyId: number): AppThunk<Promise<VerificationProcess>> {
  return async (dispatch: AppDispatch, getState) => {
    const data = await verificationProcessServices.generate(companyId);
    const state = getState();
    const updatedProcesses = [
      ...state.verificationProcess.records,
      data,
    ];
    dispatch<VerificationProcessActionTypes>({
      type: 'VERIFICATION_PROCESS_LOADED',
      payload: updatedProcesses,
    });
    return data;
  };
}

const verificationProcessActions = {
  getAll,
  getAllByCompany,
  getAllPending,
  getAllSupport,
  getAllReviewed,
  getAllClassified,
  getRatingCount,
  generate,
};

export default verificationProcessActions;
