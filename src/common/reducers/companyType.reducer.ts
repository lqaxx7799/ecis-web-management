import { CompanyType } from "../../types/models";

export const COMPANY_TYPE_LOADING = 'COMPANY_TYPE_LOADING';
export const COMPANY_TYPE_LOADED = 'COMPANY_TYPE_LOADED';
export const COMPANY_TYPE_LOAD_FAILED = 'COMPANY_TYPE_LOAD_FAILED';

interface CompanyTypeLoading {
  type: typeof COMPANY_TYPE_LOADING;
};

interface CompanyTypeLoaded {
  type: typeof COMPANY_TYPE_LOADED;
  payload: CompanyType[];
};

interface CompanyTypeLoadFailed {
  type: typeof COMPANY_TYPE_LOAD_FAILED;
};

export type CompanyTypeActionTypes = 
  | CompanyTypeLoading
  | CompanyTypeLoaded
  | CompanyTypeLoadFailed;

export type CompanyTypeState = {
  loading: boolean;
  companyTypes: CompanyType[];
};

const initialState: CompanyTypeState =  {
  loading: false,
  companyTypes: []
};

const companyTypeReducer = (state = initialState, action: CompanyTypeActionTypes): CompanyTypeState => {
  switch (action.type) {
    case COMPANY_TYPE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case COMPANY_TYPE_LOADED:
      return {
        ...state,
        loading: false,
        companyTypes: action.payload,
      };
    case COMPANY_TYPE_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default companyTypeReducer;

