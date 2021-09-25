import { VerificationProcess } from '../../types/models';

export const VERIFICATION_PROCESS_LOADING = 'VERIFICATION_PROCESS_LOADING';
export const VERIFICATION_PROCESS_LOADED = 'VERIFICATION_PROCESS_LOADED';
export const VERIFICATION_PROCESS_LOAD_FAILED = 'VERIFICATION_PROCESS_LOAD_FAILED';

interface VerificationProcessLoading {
  type: typeof VERIFICATION_PROCESS_LOADING;
};

interface VerificationProcessLoaded {
  type: typeof VERIFICATION_PROCESS_LOADED;
  payload: VerificationProcess[];
};

interface VerificationProcessLoadFailed {
  type: typeof VERIFICATION_PROCESS_LOAD_FAILED;
};

export type VerificationProcessActionTypes = 
  | VerificationProcessLoading
  | VerificationProcessLoaded
  | VerificationProcessLoadFailed;

export type VerificationProcessState = {
  records: VerificationProcess[];
  loading: boolean;
};

const initialState: VerificationProcessState = {
  records: [],
  loading: false,
};

const verificationProcessReducer = (state = initialState, action: VerificationProcessActionTypes): VerificationProcessState => {
  switch (action.type) {
    case VERIFICATION_PROCESS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case VERIFICATION_PROCESS_LOADED:
      return {
        ...state,
        records: action.payload,
        loading: false,
      };
    case VERIFICATION_PROCESS_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default verificationProcessReducer;
