import { VerificationConfirmRequirement } from "../../types/models";

export const VERIFICATION_CONFIRM_REQUIREMENT_LOADING = 'VERIFICATION_CONFIRM_REQUIREMENT_LOADING';
export const VERIFICATION_CONFIRM_REQUIREMENT_LOADED = 'VERIFICATION_CONFIRM_REQUIREMENT_LOADED';
export const VERIFICATION_CONFIRM_REQUIREMENT_LOAD_FAILED = 'VERIFICATION_CONFIRM_REQUIREMENT_LOAD_FAILED';
export const VERIFICATION_CONFIRM_REQUIREMENT_EDITING_LOADED = 'VERIFICATION_CONFIRM_REQUIREMENT_EDITING_LOADED';

interface VerificationConfirmRequirementLoading {
  type: typeof VERIFICATION_CONFIRM_REQUIREMENT_LOADING;
};

interface VerificationConfirmRequirementLoaded {
  type: typeof VERIFICATION_CONFIRM_REQUIREMENT_LOADED;
  payload: VerificationConfirmRequirement[];
};

interface VerificationConfirmRequirementLoadFailed {
  type: typeof VERIFICATION_CONFIRM_REQUIREMENT_LOAD_FAILED;
};

interface VerificationConfirmRequirementEditingLoaded {
  type: typeof VERIFICATION_CONFIRM_REQUIREMENT_EDITING_LOADED;
  payload?: VerificationConfirmRequirement;
};

export type VerificationConfirmRequirementActionTypes = 
  | VerificationConfirmRequirementLoading
  | VerificationConfirmRequirementLoaded
  | VerificationConfirmRequirementLoadFailed
  | VerificationConfirmRequirementEditingLoaded;

export type VerificationConfirmRequirementState = {
  loading: boolean;
  verificationConfirmRequirements: VerificationConfirmRequirement[];
  editingRequirement?: VerificationConfirmRequirement;
};

const initialState: VerificationConfirmRequirementState =  {
  loading: false,
  verificationConfirmRequirements: [],
  editingRequirement: undefined,
};

const verificationConfirmRequirementReducer = (state = initialState, action: VerificationConfirmRequirementActionTypes): VerificationConfirmRequirementState => {
  switch (action.type) {
    case VERIFICATION_CONFIRM_REQUIREMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case VERIFICATION_CONFIRM_REQUIREMENT_LOADED:
      return {
        ...state,
        loading: false,
        verificationConfirmRequirements: action.payload,
      };
    case VERIFICATION_CONFIRM_REQUIREMENT_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VERIFICATION_CONFIRM_REQUIREMENT_EDITING_LOADED:
      return {
        ...state,
        editingRequirement: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default verificationConfirmRequirementReducer;
