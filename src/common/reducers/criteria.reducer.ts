import { Criteria } from "../../types/models";

export const CRITERIA_LOADING = 'CRITERIA_LOADING';
export const CRITERIA_LOADED = 'CRITERIA_LOADED';
export const CRITERIA_LOAD_FAILED = 'CRITERIA_LOAD_FAILED';

interface CriteriaLoading {
  type: typeof CRITERIA_LOADING;
};

interface CriteriaLoaded {
  type: typeof CRITERIA_LOADED;
  payload: Criteria[];
};

interface CriteriaLoadFailed {
  type: typeof CRITERIA_LOAD_FAILED;
};

export type CriteriaActionTypes = 
  | CriteriaLoading
  | CriteriaLoaded
  | CriteriaLoadFailed;

export type CriteriaState = {
  loading: boolean;
  criterias: Criteria[];
};

const initialState: CriteriaState =  {
  loading: false,
  criterias: []
};

const criteriaReducer = (state = initialState, action: CriteriaActionTypes): CriteriaState => {
  switch (action.type) {
    case CRITERIA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CRITERIA_LOADED:
      return {
        ...state,
        loading: false,
        criterias: action.payload,
      };
    case CRITERIA_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default criteriaReducer;
