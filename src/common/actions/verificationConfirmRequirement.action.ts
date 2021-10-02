import { AppDispatch } from '../../app/store';
import { VerificationConfirmRequirementDTO, VerificationConfirmUpdateDTO } from '../../types/dto';
import { VerificationConfirmRequirement } from '../../types/models';
import { VerificationConfirmRequirementActionTypes } from '../reducers/verificationConfirmRequirement.reducer';
import verificationConfirmRequirementServices from '../services/verificationConfirmRequirement.services';
import { AppThunk } from './type';

function getAssigned(agentId: number): AppThunk<Promise<VerificationConfirmRequirement[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationConfirmRequirementActionTypes>({
      type: 'VERIFICATION_CONFIRM_REQUIREMENT_LOADING',
    });
    try {
      const result = await verificationConfirmRequirementServices.getAssigned(agentId);
      dispatch<VerificationConfirmRequirementActionTypes>({
        type: 'VERIFICATION_CONFIRM_REQUIREMENT_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<VerificationConfirmRequirementActionTypes>({
        type: 'VERIFICATION_CONFIRM_REQUIREMENT_LOAD_FAILED',
      });
      return [];
    }
  };
}

function getByProcessId(processId: number): AppThunk<Promise<VerificationConfirmRequirement | undefined>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationConfirmRequirementActionTypes>({
      type: 'VERIFICATION_CONFIRM_REQUIREMENT_LOADING',
    });
    try {
      const result = await verificationConfirmRequirementServices.getByProcessId(processId);
      dispatch<VerificationConfirmRequirementActionTypes>({
        type: 'VERIFICATION_CONFIRM_REQUIREMENT_EDITING_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<VerificationConfirmRequirementActionTypes>({
        type: 'VERIFICATION_CONFIRM_REQUIREMENT_LOAD_FAILED',
      });
      return undefined;
    }
  };
}

function getById(processId: number): AppThunk<Promise<VerificationConfirmRequirement | undefined>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationConfirmRequirementActionTypes>({
      type: 'VERIFICATION_CONFIRM_REQUIREMENT_LOADING',
    });
    try {
      const result = await verificationConfirmRequirementServices.getById(processId);
      dispatch<VerificationConfirmRequirementActionTypes>({
        type: 'VERIFICATION_CONFIRM_REQUIREMENT_EDITING_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<VerificationConfirmRequirementActionTypes>({
        type: 'VERIFICATION_CONFIRM_REQUIREMENT_LOAD_FAILED',
      });
      return undefined;
    }
  };
}

function create(data: VerificationConfirmRequirementDTO): AppThunk<Promise<VerificationConfirmRequirement>> {
  return (dispatch: AppDispatch) => {
    const formattedData: Partial<VerificationConfirmRequirement> = {
      ...data,
      assignedAgentId: parseInt(data.assignedAgentId),
    };
    return verificationConfirmRequirementServices.create(formattedData);
  };
}

function announceCompany(data: VerificationConfirmUpdateDTO): AppThunk<Promise<VerificationConfirmRequirement>> {
  return (dispatch: AppDispatch) => {
    return verificationConfirmRequirementServices.announceCompany(data);
  };
}

function finishConfirm(data: VerificationConfirmUpdateDTO): AppThunk<Promise<VerificationConfirmRequirement>> {
  return (dispatch: AppDispatch) => {
    return verificationConfirmRequirementServices.finishConfirm(data);
  };
}

const verificationConfirmRequirementActions = {
  getAssigned,
  getByProcessId,
  getById,
  create,
  announceCompany,
  finishConfirm,
};

export default verificationConfirmRequirementActions;
