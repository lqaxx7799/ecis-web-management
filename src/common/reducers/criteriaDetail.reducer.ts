import { CriteriaDetail } from "../../types/models";

export const CRITERIA_DETAIL_LOADING = 'CRITERIA_DETAIL_LOADING';
export const CRITERIA_DETAIL_LOADED = 'CRITERIA_DETAIL_LOADED';
export const CRITERIA_DETAIL_LOAD_FAILED = 'CRITERIA_DETAIL_LOAD_FAILED';

interface CriteriaLoading {
  type: typeof CRITERIA_DETAIL_LOADING;
};

interface CriteriaLoaded {
  type: typeof CRITERIA_DETAIL_LOADED;
  payload: CriteriaDetail[];
};

interface CriteriaLoadFailed {
  type: typeof CRITERIA_DETAIL_LOAD_FAILED;
};

export type CriteriaDetailActionTypes = 
  | CriteriaLoading
  | CriteriaLoaded
  | CriteriaLoadFailed;

export type CriteriaDetailState = {
  loading: boolean;
  criteriaDetails: CriteriaDetail[];
};

const initialState: CriteriaDetailState =  {
  loading: false,
  criteriaDetails: []
};

const criteriaDetailReducer = (state = initialState, action: CriteriaDetailActionTypes): CriteriaDetailState => {
  switch (action.type) {
    case CRITERIA_DETAIL_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CRITERIA_DETAIL_LOADED:
      return {
        ...state,
        loading: false,
        criteriaDetails: action.payload,
      };
    case CRITERIA_DETAIL_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default criteriaDetailReducer;
