import { CompanyReport, CompanyReportDocument } from "../../types/models";

export const COMPANY_REPORT_LOADING = 'COMPANY_REPORT_LOADING';
export const COMPANY_REPORT_LOADED = 'COMPANY_REPORT_LOADED';
export const COMPANY_REPORT_LOAD_FAILED = 'COMPANY_REPORT_LOAD_FAILED';
export const COMPANY_REPORT_DETAIL_LOADED = 'COMPANY_REPORT_DETAIL_LOADED';
export const COMPANY_REPORT_DETAIL_EDITED = 'COMPANY_REPORT_DETAIL_EDITED';

interface CompanyReportLoading {
  type: typeof COMPANY_REPORT_LOADING;
};

interface CompanyReportLoaded {
  type: typeof COMPANY_REPORT_LOADED;
  payload: CompanyReport[];
};

interface CompanyReportLoadFailed {
  type: typeof COMPANY_REPORT_LOAD_FAILED;
};

interface CompanyReportDetailLoaded {
  type: typeof COMPANY_REPORT_DETAIL_LOADED;
  payload: {
    companyReport: CompanyReport;
    companyReportDocuments: CompanyReportDocument[];
  };
};

interface CompanyReportDetailEdited {
  type: typeof COMPANY_REPORT_DETAIL_EDITED;
  payload?: CompanyReport;
};

export type CompanyReportActionTypes = 
  | CompanyReportLoading
  | CompanyReportLoaded
  | CompanyReportLoadFailed
  | CompanyReportDetailLoaded
  | CompanyReportDetailEdited;

export type CompanyReportState = {
  loading: boolean;
  companyReports: CompanyReport[];
  editingCompanyReport?: CompanyReport;
  companyReportDocuments: CompanyReportDocument[];
};

const initialState: CompanyReportState =  {
  loading: false,
  companyReports: [],
  editingCompanyReport: undefined,
  companyReportDocuments: [],
};

const companyReportReducer = (state = initialState, action: CompanyReportActionTypes): CompanyReportState => {
  switch (action.type) {
    case COMPANY_REPORT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case COMPANY_REPORT_LOADED:
      return {
        ...state,
        loading: false,
        companyReports: action.payload,
      };
    case COMPANY_REPORT_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    case COMPANY_REPORT_DETAIL_LOADED:
      return {
        ...state,
        loading: false,
        editingCompanyReport: action.payload.companyReport,
        companyReportDocuments: action.payload.companyReportDocuments,
      };
    case COMPANY_REPORT_DETAIL_EDITED:
      return {
        ...state,
        editingCompanyReport: action.payload,
      };
    default:
      return state;
  }
};

export default companyReportReducer;

