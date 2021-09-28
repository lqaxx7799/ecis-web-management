import { Company, DocumentReview, VerificationCriteria, VerificationDocument, VerificationProcess } from "../../types/models";

export const VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADING = 'VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADING';
export const VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADED = 'VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADED';
export const VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOAD_FAILED = 'VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOAD_FAILED';
export const VERIFICATION_PROCESS_MANAGEMENT_DOCUMENTS_UPDATED = 'VERIFICATION_PROCESS_MANAGEMENT_DOCUMENTS_UPDATED';
export const VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_CREATED = 'VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_CREATED';
export const VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_EDITED = 'VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_EDITED';
export const VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_MODAL_STATE_CHANGED = 'VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_MODAL_STATE_CHANGED';
export const VERIFICATION_PROCESS_MANAGEMENT_REVIEWS_LOADED = 'VERIFICATION_PROCESS_MANAGEMENT_REVIEWS_LOADED';
export const VERIFICATION_PROCESS_MANAGEMENT_CRITERIA_UPDATED = 'VERIFICATION_PROCESS_MANAGEMENT_CRITERIA_UPDATED';
export const VERIFICATION_PROCESS_MANAGEMENT_PROCESS_UPDATED = 'VERIFICATION_PROCESS_MANAGEMENT_PROCESS_UPDATED';
export const VERIFICATION_PROCESS_MANAGEMENT_COMPANY_LOADED = 'VERIFICATION_PROCESS_MANAGEMENT_COMPANY_LOADED';
export const VERIFICATION_PROCESS_MANAGEMENT_VERIFY_COMPLETE_MODAL_STATE_CHANGED = 'VERIFICATION_PROCESS_MANAGEMENT_VERIFY_COMPLETE_MODAL_STATE_CHANGED';

interface VerificationProcessManagementDetailLoading {
  type: typeof VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADING;
};

interface VerificationProcessManagementDetailLoaded {
  type: typeof VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADED;
  payload: {
    editingProcess: VerificationProcess;
    verificationCriterias: VerificationCriteria[];
    verificationDocuments: VerificationDocument[];
  };
};

interface VerificationProcessManagementDetailLoadFailed {
  type: typeof VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOAD_FAILED;
};

interface VerificationProcessManagementDocumentCreated {
  type: typeof VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_CREATED;
  payload: VerificationDocument;
};

interface VerificationProcessManagementDocumentEdited {
  type: typeof VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_EDITED;
  payload?: VerificationDocument;
};

interface VerificationProcessManagementDocumentModalStateChanged {
  type: typeof VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_MODAL_STATE_CHANGED;
  payload: boolean;
};

interface VerificationProcessManagementDocumentsUpdated {
  type: typeof VERIFICATION_PROCESS_MANAGEMENT_DOCUMENTS_UPDATED;
  payload: VerificationDocument[];
};

interface VerificationProcessManagementReviewsLoaded {
  type: typeof VERIFICATION_PROCESS_MANAGEMENT_REVIEWS_LOADED;
  payload: DocumentReview[];
};

interface VerificationProcessManagementCriteriaUpdated {
  type: typeof VERIFICATION_PROCESS_MANAGEMENT_CRITERIA_UPDATED;
  payload: VerificationCriteria[];
};

interface VerificationProcessManagementProcessUpdated {
  type: typeof VERIFICATION_PROCESS_MANAGEMENT_PROCESS_UPDATED;
  payload: VerificationProcess;
};

interface VerificationProcessManagementCompanyLoaded {
  type: typeof VERIFICATION_PROCESS_MANAGEMENT_COMPANY_LOADED;
  payload: Company;
};

interface VerificationProcessManagementVerifyCompleteModalStateChanged {
  type: typeof VERIFICATION_PROCESS_MANAGEMENT_VERIFY_COMPLETE_MODAL_STATE_CHANGED;
  payload: boolean;
};

export type VerificationProcessManagementActionTypes =
  | VerificationProcessManagementDetailLoading
  | VerificationProcessManagementDetailLoaded
  | VerificationProcessManagementDetailLoadFailed
  | VerificationProcessManagementDocumentCreated
  | VerificationProcessManagementDocumentEdited
  | VerificationProcessManagementDocumentModalStateChanged
  | VerificationProcessManagementDocumentsUpdated
  | VerificationProcessManagementReviewsLoaded
  | VerificationProcessManagementCriteriaUpdated
  | VerificationProcessManagementProcessUpdated
  | VerificationProcessManagementCompanyLoaded
  | VerificationProcessManagementVerifyCompleteModalStateChanged;

export type VerificationProcessManagementState = {
  loading: boolean;
  verificationDocuments: VerificationDocument[];
  verificationCriterias: VerificationCriteria[];
  editingProcess?: VerificationProcess;
  editingDocument?: VerificationDocument;
  showEditingDocumentModal: boolean;
  showVerifyCompletetModal: boolean;
  documentReviews: DocumentReview[];
  company?: Company;
};

const initialState: VerificationProcessManagementState = {
  loading: false,
  verificationCriterias: [],
  verificationDocuments: [],
  editingProcess: undefined,
  editingDocument: undefined,
  showEditingDocumentModal: false,
  showVerifyCompletetModal: false,
  documentReviews: [],
  company: undefined,
};

const verficationProcessManagementReducer = (
  state: VerificationProcessManagementState = initialState,
  action: VerificationProcessManagementActionTypes
): VerificationProcessManagementState => {
  switch (action.type) {
    case "VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADED":
      return {
        ...state,
        loading: false,
        editingProcess: action.payload.editingProcess,
        verificationCriterias: action.payload.verificationCriterias,
        verificationDocuments: action.payload.verificationDocuments,
        editingDocument: undefined,
      };
    case "VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOAD_FAILED":
      return {
        ...state,
        loading: false,
      }
    case "VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_CREATED":
      return {
        ...state,
        verificationDocuments: [...state.verificationDocuments, action.payload],
      };
    case "VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_EDITED":
      return {
        ...state,
        editingDocument: action.payload,
      };
    case "VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_MODAL_STATE_CHANGED":
      return {
        ...state,
        showEditingDocumentModal: action.payload,
      };
    case "VERIFICATION_PROCESS_MANAGEMENT_DOCUMENTS_UPDATED":
      return {
        ...state,
        verificationDocuments: action.payload,
      };
    case "VERIFICATION_PROCESS_MANAGEMENT_REVIEWS_LOADED":
      return {
        ...state,
        documentReviews: action.payload,
      };
    case 'VERIFICATION_PROCESS_MANAGEMENT_CRITERIA_UPDATED':
      return {
        ...state,
        verificationCriterias: action.payload,
      };
    case "VERIFICATION_PROCESS_MANAGEMENT_PROCESS_UPDATED":
      return {
        ...state,
        editingProcess: action.payload,
      };
    case "VERIFICATION_PROCESS_MANAGEMENT_COMPANY_LOADED":
      return {
        ...state,
        company: action.payload,
      };
    case "VERIFICATION_PROCESS_MANAGEMENT_VERIFY_COMPLETE_MODAL_STATE_CHANGED":
      return {
        ...state,
        showVerifyCompletetModal: action.payload,
      };
    default:
      return state;
  }
};

export default verficationProcessManagementReducer;
