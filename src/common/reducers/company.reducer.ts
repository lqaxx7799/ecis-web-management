import { Company } from "../../types/models";

export const COMPANY_LOADING = 'COMPANY_LOADING';
export const COMPANY_LOADED = 'COMPANY_LOADED';
export const COMPANY_LOAD_FAILED = 'COMPANY_LOAD_FAILED';
export const COMPANY_DETAIL_LOADED = 'COMPANY_DETAIL_LOADED';

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

interface CompanyDetailLoaded {
  type: typeof COMPANY_DETAIL_LOADED;
  payload: Company;
};

export type CompanyActionTypes = 
  | CompanyLoading
  | CompanyLoaded
  | CompanyLoadFailed
  | CompanyDetailLoaded;

export type CompanyState = {
  loading: boolean;
  companies: Company[];
  editingCompany?: Company;
};

const initialState: CompanyState =  {
  loading: false,
  companies: [],
  editingCompany: undefined,
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
    case COMPANY_DETAIL_LOADED:
      return {
        ...state,
        editingCompany: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default companyReducer;
