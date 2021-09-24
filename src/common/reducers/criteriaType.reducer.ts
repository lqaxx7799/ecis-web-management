import { CriteriaType } from "../../types/models";

export const CRITERIA_TYPE_LOADING = 'CRITERIA_TYPE_LOADING';
export const CRITERIA_TYPE_LOADED = 'CRITERIA_TYPE_LOADED';
export const CRITERIA_TYPE_LOAD_FAILED = 'CRITERIA_TYPE_LOAD_FAILED';

interface CriteriaTypeLoading {
  type: typeof CRITERIA_TYPE_LOADING;
};

interface CriteriaTypeLoaded {
  type: typeof CRITERIA_TYPE_LOADED;
  payload: CriteriaType[];
};

interface CriteriaTypeLoadFailed {
  type: typeof CRITERIA_TYPE_LOAD_FAILED;
};

export type CriteriaTypeActionTypes = 
  | CriteriaTypeLoading
  | CriteriaTypeLoaded
  | CriteriaTypeLoadFailed;

export type CriteriaTypeState = {
  loading: boolean;
  criteriaTypes: CriteriaType[];
};

const initialState: CriteriaTypeState =  {
  loading: false,
  criteriaTypes: []
};

const criteriaTypeReducer = (state = initialState, action: CriteriaTypeActionTypes): CriteriaTypeState => {
  switch (action.type) {
    case CRITERIA_TYPE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CRITERIA_TYPE_LOADED:
      return {
        ...state,
        loading: false,
        criteriaTypes: action.payload,
      };
    case CRITERIA_TYPE_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default criteriaTypeReducer;
