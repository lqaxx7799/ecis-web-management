import { Company } from "../../types/models";

export const COMPANY_LOADING = 'COMPANY_LOADING';
export const COMPANY_LOADED = 'COMPANY_LOADED';
export const COMPANY_LOAD_FAILED = 'COMPANY_LOAD_FAILED';

interface CompanyLoading {
  type: typeof COMPANY_LOADING;
};

interface CompanyLoaded {
  type: typeof COMPANY_LOADED;
  payload: Company[];
};

interface CompanyLoadFailed {
  type: typeof COMPANY_LOAD_FAILED;
};

export type CompanyActionTypes = 
  | CompanyLoading
  | CompanyLoaded
  | CompanyLoadFailed;

export type CompanyState = {
  loading: boolean;
  companies: Company[];
};

const initialState: CompanyState =  {
  loading: false,
  companies: []
};

const companyReducer = (state = initialState, action: CompanyActionTypes): CompanyState => {
  switch (action.type) {
    case COMPANY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case COMPANY_LOADED:
      return {
        ...state,
        loading: false,
        companies: action.payload,
      };
    case COMPANY_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default companyReducer;

