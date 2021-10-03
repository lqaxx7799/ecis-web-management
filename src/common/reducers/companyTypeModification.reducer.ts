import { CompanyTypeModification } from "../../types/models";

export const COMPANY_TYPE_MODIFICATION_LOADING = 'COMPANY_TYPE_MODIFICATION_LOADING';
export const COMPANY_TYPE_MODIFICATION_LOADED = 'COMPANY_TYPE_MODIFICATION_LOADED';
export const COMPANY_TYPE_MODIFICATION_LOAD_FAILED = 'COMPANY_TYPE_MODIFICATION_LOAD_FAILED';

interface CompanyTypeModificationLoading {
  type: typeof COMPANY_TYPE_MODIFICATION_LOADING;
};

interface CompanyTypeModificationLoaded {
  type: typeof COMPANY_TYPE_MODIFICATION_LOADED;
  payload: CompanyTypeModification[];
};

interface CompanyTypeModificationLoadFailed {
  type: typeof COMPANY_TYPE_MODIFICATION_LOAD_FAILED;
};

export type CompanyTypeModificationActionTypes = 
  | CompanyTypeModificationLoading
  | CompanyTypeModificationLoaded
  | CompanyTypeModificationLoadFailed;

export type CompanyTypeModificationState = {
  loading: boolean;
  companyTypeModifications: CompanyTypeModification[];
};

const initialState: CompanyTypeModificationState =  {
  loading: false,
  companyTypeModifications: []
};

const companyTypeModificationReducer = (state = initialState, action: CompanyTypeModificationActionTypes): CompanyTypeModificationState => {
  switch (action.type) {
    case COMPANY_TYPE_MODIFICATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case COMPANY_TYPE_MODIFICATION_LOADED:
      return {
        ...state,
        loading: false,
        companyTypeModifications: action.payload,
      };
    case COMPANY_TYPE_MODIFICATION_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default companyTypeModificationReducer;

