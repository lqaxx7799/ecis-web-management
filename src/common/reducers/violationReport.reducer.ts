import { ViolationReport, ViolationReportDocument } from "../../types/models";

export const VIOLATION_REPORT_LOADING = 'VIOLATION_REPORT_LOADING';
export const VIOLATION_REPORT_LOADED = 'VIOLATION_REPORT_LOADED';
export const VIOLATION_REPORT_LOAD_FAILED = 'VIOLATION_REPORT_LOAD_FAILED';
export const VIOLATION_REPORT_DETAIL_LOADED = 'VIOLATION_REPORT_DETAIL_LOADED';
export const VIOLATION_REPORT_DETAIL_EDITED = 'VIOLATION_REPORT_DETAIL_EDITED';

interface ViolationReportLoading {
  type: typeof VIOLATION_REPORT_LOADING;
};

interface ViolationReportLoaded {
  type: typeof VIOLATION_REPORT_LOADED;
  payload: ViolationReport[];
};

interface ViolationReportLoadFailed {
  type: typeof VIOLATION_REPORT_LOAD_FAILED;
};

interface ViolationReportDetailLoaded {
  type: typeof VIOLATION_REPORT_DETAIL_LOADED;
  payload: {
    violationReport: ViolationReport;
    violationReportDocuments: ViolationReportDocument[];
  };
};

interface ViolationReportDetailEdited {
  type: typeof VIOLATION_REPORT_DETAIL_EDITED;
  payload?: ViolationReport;
};

export type ViolationReportActionTypes = 
  | ViolationReportLoading
  | ViolationReportLoaded
  | ViolationReportLoadFailed
  | ViolationReportDetailLoaded
  | ViolationReportDetailEdited;

export type ViolationReportState = {
  loading: boolean;
  violationReports: ViolationReport[];
  editingViolationReport?: ViolationReport;
  violationReportDocuments: ViolationReportDocument[];
};

const initialState: ViolationReportState =  {
  loading: false,
  violationReports: [],
  editingViolationReport: undefined,
  violationReportDocuments: [],
};

const violationReportReducer = (state = initialState, action: ViolationReportActionTypes): ViolationReportState => {
  switch (action.type) {
    case VIOLATION_REPORT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case VIOLATION_REPORT_LOADED:
      return {
        ...state,
        loading: false,
        violationReports: action.payload,
      };
    case VIOLATION_REPORT_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VIOLATION_REPORT_DETAIL_LOADED:
      return {
        ...state,
        loading: false,
        editingViolationReport: action.payload.violationReport,
        violationReportDocuments: action.payload.violationReportDocuments,
      };
    case VIOLATION_REPORT_DETAIL_EDITED:
      return {
        ...state,
        editingViolationReport: action.payload,
      };
    default:
      return state;
  }
};

export default violationReportReducer;

