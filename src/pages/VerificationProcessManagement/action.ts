import _ from "lodash";
import { AppDispatch, RootState } from "../../app/store";
import companyTypeActions from "../../common/actions/companyType.action";
import criteriaActions from "../../common/actions/criteria.action";
import criteriaDetailActions from "../../common/actions/criteriaDetail.action";
import criteriaTypeActions from "../../common/actions/criteriaType.action";
import { AppThunk } from "../../common/actions/type";
import { VerificationProcessActionTypes } from "../../common/reducers/verificationProcess.reducer";
import companyServices from "../../common/services/company.services";
import documentReviewServices from "../../common/services/documentReview.services";
import verificationCriteriaServices from "../../common/services/verificationCriteria.services";
import verificationDocumentServices from "../../common/services/verificationDocument.services";
import verificationProcessServices from "../../common/services/verificationProcess.services";
import { DocumentReview, VerificationCriteria, VerificationDocument, VerificationProcess } from "../../types/models";
import { VerificationProcessManagementActionTypes } from "./reducer";

function createDocument(data: Partial<VerificationDocument>): AppThunk<Promise<VerificationDocument>> {
  return async (dispatch: AppDispatch) => {
    const document = await verificationDocumentServices.create(data);
    dispatch<VerificationProcessManagementActionTypes>({
      type: "VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_CREATED",
      payload: document,
    });
    return document;
  };
}

function editDocument(data: VerificationDocument | undefined): AppThunk<void> {
  return (dispatch: AppDispatch) => {
    dispatch<VerificationProcessManagementActionTypes>({
      type: "VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_EDITED",
      payload: data,
    });
  };
}

function changeEditDocumentModalState(state: boolean): AppThunk<void> {
  return (dispatch: AppDispatch) => {
    dispatch<VerificationProcessManagementActionTypes>({
      type: "VERIFICATION_PROCESS_MANAGEMENT_DOCUMENT_MODAL_STATE_CHANGED",
      payload: state,
    });
  };
}

function updateDocument(data: Partial<VerificationDocument>): AppThunk<Promise<VerificationDocument>> {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const updatedDocument = await verificationDocumentServices.update(data);
    const state = getState();
    const updatedDocuments = state.verificationProcessManagement.verificationDocuments.map(
      (document) => document.id === updatedDocument.id ? updatedDocument : document
    );
    dispatch<VerificationProcessManagementActionTypes>({
      type: "VERIFICATION_PROCESS_MANAGEMENT_DOCUMENTS_UPDATED",
      payload: updatedDocuments,
    });
    return updatedDocument;
  };
}

function removeDocument(documentId: number): AppThunk<Promise<void>> {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    await verificationDocumentServices.remove(documentId);
    const state = getState();
    const updatedDocuments = state.verificationProcessManagement.verificationDocuments.filter(
      (document) => document.id !== documentId
    );
    dispatch<VerificationProcessManagementActionTypes>({
      type: "VERIFICATION_PROCESS_MANAGEMENT_DOCUMENTS_UPDATED",
      payload: updatedDocuments,
    });
  };
}

function loadSelfVerification(processId: number): AppThunk<Promise<VerificationProcess | null>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationProcessManagementActionTypes>({
      type: 'VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADING',
    });
    try {
      const [process, criterias, documents] = await Promise.all([
        verificationProcessServices.getById(processId),
        verificationCriteriaServices.getAllByProcessId(processId),
        verificationDocumentServices.getAllByProcessId(processId),
        dispatch(criteriaActions.getAll()),
        dispatch(criteriaTypeActions.getAll()),
        dispatch(criteriaDetailActions.getAll()),
        dispatch(companyTypeActions.getAll()),
      ]);
      dispatch<VerificationProcessManagementActionTypes>({
        type: 'VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADED',
        payload: {
          editingProcess: process,
          verificationCriterias: criterias,
          verificationDocuments: documents,
        },
      });
      const companyId = _.get(process, 'companyId');
      const company = await companyServices.getById(companyId);
      dispatch<VerificationProcessManagementActionTypes>({
        type: 'VERIFICATION_PROCESS_MANAGEMENT_COMPANY_LOADED',
        payload: company,
      });
      return process;
    } catch (e) {
      dispatch<VerificationProcessManagementActionTypes>({
        type: 'VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOAD_FAILED',
      });
      return null;
    }
  };
}

function loadReview(documentId: number): AppThunk<Promise<DocumentReview[]>> {
  return async (dispatch) => {
    const reviews = await documentReviewServices.getAllByDocumentId(documentId);
    dispatch<VerificationProcessManagementActionTypes>({
      type: 'VERIFICATION_PROCESS_MANAGEMENT_REVIEWS_LOADED',
      payload: reviews,
    });
    return reviews;
  };
}

function loadAllReviewsByProcessId(processId: number): AppThunk<Promise<DocumentReview[]>> {
  return async (dispatch) => {
    const reviews = await documentReviewServices.getAllByProcessId(processId);
    dispatch<VerificationProcessManagementActionTypes>({
      type: 'VERIFICATION_PROCESS_MANAGEMENT_REVIEWS_LOADED',
      payload: reviews,
    });
    return reviews;
  };
}

function addReview(payload: Partial<DocumentReview>): AppThunk<Promise<DocumentReview>> {
  return async (dispatch, getState) => {
    const state = getState();
    const review = await documentReviewServices.add(payload);
    
    const reviews = state.verificationProcessManagement.documentReviews;
    const updatedReviews = [...reviews, review];

    dispatch<VerificationProcessManagementActionTypes>({
      type: 'VERIFICATION_PROCESS_MANAGEMENT_REVIEWS_LOADED',
      payload: updatedReviews,
    });
    return review;
  };
}

function updateReview(payload: Partial<DocumentReview>): AppThunk<Promise<DocumentReview>> {
  return async (dispatch, getState) => {
    const state = getState();
    const review = await documentReviewServices.update(payload);
    
    const reviews = state.verificationProcessManagement.documentReviews;
    const updatedReviews = _.map(reviews, (item) => item.id === review.id ? review : item);

    dispatch<VerificationProcessManagementActionTypes>({
      type: 'VERIFICATION_PROCESS_MANAGEMENT_REVIEWS_LOADED',
      payload: updatedReviews,
    });
    return review;
  };
}

function removeReview(reviewId: number): AppThunk<Promise<void>> {
  return async (dispatch, getState) => {
    const state = getState();
    await documentReviewServices.remove(reviewId);
    
    const reviews = state.verificationProcessManagement.documentReviews;
    const updatedReviews = _.filter(reviews, (item) => item.id !== reviewId);

    dispatch<VerificationProcessManagementActionTypes>({
      type: 'VERIFICATION_PROCESS_MANAGEMENT_REVIEWS_LOADED',
      payload: updatedReviews,
    });
  };
}

function updateCriteriaCompliance(
  value: boolean,
  verificationCriteriaId: number
): AppThunk<Promise<VerificationCriteria>> {
  return async (dispatch, getState) => {
    const state = getState();
    
    const { verificationCriterias } = state.verificationProcessManagement;
    const verificationCriteria = _.find(
      verificationCriterias,
      (item) => item.id === verificationCriteriaId
    );
    const data: Partial<VerificationCriteria> = {
      ...verificationCriteria,
      approvedStatus: value ? 'VERIFIED' : 'REJECTED',
    };
    const updated = await verificationCriteriaServices.update(data);

    dispatch<VerificationProcessManagementActionTypes>({
      type: 'VERIFICATION_PROCESS_MANAGEMENT_CRITERIA_UPDATED',
      payload: _.map(verificationCriterias, (item) => item.id === verificationCriteriaId ? updated : item),
    });

    return updated;
  };
}

function updateCriteriaField(
  fieldName: string,
  verificationCriteriaId: number,
  value: string,
): AppThunk<Promise<VerificationCriteria>> {
  return async (dispatch, getState) => {
    const state = getState();
    
    const { verificationCriterias } = state.verificationProcessManagement;
    const verificationCriteria = _.find(
      verificationCriterias,
      (item) => item.id === verificationCriteriaId
    );
    const data: Partial<VerificationCriteria> = {
      ...verificationCriteria,
      [fieldName]: value,
    };
    const updated = await verificationCriteriaServices.update(data);

    dispatch<VerificationProcessManagementActionTypes>({
      type: 'VERIFICATION_PROCESS_MANAGEMENT_CRITERIA_UPDATED',
      payload: _.map(verificationCriterias, (item) => item.id === verificationCriteriaId ? updated : item),
    });

    return updated;
  };
}

function updateVerificationCriteria(data: Partial<VerificationCriteria>): AppThunk<Promise<VerificationCriteria>> {
  return async (dispatch, getState) => {
    const state = getState();
    
    const { verificationCriterias } = state.verificationProcessManagement;

    const updated = await verificationCriteriaServices.update(data);

    dispatch<VerificationProcessManagementActionTypes>({
      type: 'VERIFICATION_PROCESS_MANAGEMENT_CRITERIA_UPDATED',
      payload: _.map(verificationCriterias, (item) => item.id === data.id ? updated : item),
    });

    return updated;
  };
}

function submitVerifyReview(verificationProcessId: number, assignedAgentId: number): AppThunk<Promise<VerificationProcess>> {
  return async (dispatch, getState) => {
    const updated = await verificationProcessServices.submitVerifyReview(verificationProcessId, assignedAgentId);

    dispatch<VerificationProcessManagementActionTypes>({
      type: 'VERIFICATION_PROCESS_MANAGEMENT_PROCESS_UPDATED',
      payload: updated,
    });

    return updated;
  };
}

function submitClassify(verificationProcessId: number, companyTypeId: number): AppThunk<Promise<VerificationProcess>> {
  return async (dispatch, getState) => {
    const updated = await verificationProcessServices.submitClassify(verificationProcessId, companyTypeId);

    dispatch<VerificationProcessManagementActionTypes>({
      type: 'VERIFICATION_PROCESS_MANAGEMENT_PROCESS_UPDATED',
      payload: updated,
    });

    return updated;
  };
}

function changeVerifyCompleteDrawerState(state: boolean): AppThunk<void> {
  return (dispatch: AppDispatch) => {
    dispatch<VerificationProcessManagementActionTypes>({
      type: "VERIFICATION_PROCESS_MANAGEMENT_VERIFY_COMPLETE_DRAWER_STATE_CHANGED",
      payload: state,
    });
  };
}

function updateProcess(process: Partial<VerificationProcess>): AppThunk<Promise<VerificationProcess>> {
  return async (dispatch: AppDispatch, getState) => {
    const result = await verificationProcessServices.update(process);
    dispatch<VerificationProcessManagementActionTypes>({
      type: "VERIFICATION_PROCESS_MANAGEMENT_PROCESS_UPDATED",
      payload: result,
    });

    const state = getState();
    const updatedRecords = _.map(state.verificationProcess.records, (item) => item.id === result.id ? result : item);

    dispatch<VerificationProcessActionTypes>({
      type: "VERIFICATION_PROCESS_LOADED",
      payload: updatedRecords,
    });

    return result;
  };
}

function finishVerify(processId: number): AppThunk<Promise<VerificationProcess>> {
  return async (dispatch: AppDispatch, getState) => {
    const result = await verificationProcessServices.finishVerify(processId);
    dispatch<VerificationProcessManagementActionTypes>({
      type: "VERIFICATION_PROCESS_MANAGEMENT_PROCESS_UPDATED",
      payload: result,
    });

    const state = getState();
    const updatedRecords = _.reject(state.verificationProcess.records, (item) => item.id === processId);

    dispatch<VerificationProcessActionTypes>({
      type: "VERIFICATION_PROCESS_LOADED",
      payload: updatedRecords,
    });

    return result;
  };
}

function rejectClassified(processId: number): AppThunk<Promise<VerificationProcess>> {
  return async (dispatch: AppDispatch, getState) => {
    const result = await verificationProcessServices.rejectClassified(processId);
    dispatch<VerificationProcessManagementActionTypes>({
      type: "VERIFICATION_PROCESS_MANAGEMENT_PROCESS_UPDATED",
      payload: result,
    });

    const state = getState();
    const updatedRecords = _.reject(state.verificationProcess.records, (item) => item.id === processId);

    dispatch<VerificationProcessActionTypes>({
      type: "VERIFICATION_PROCESS_LOADED",
      payload: updatedRecords,
    });

    return result;
  };
}

const verificationProcessManagementActions = {
  loadSelfVerification,
  submitVerifyReview,
  submitClassify,
  changeVerifyCompleteDrawerState,
  updateProcess,
  finishVerify,
  rejectClassified,

  createDocument,
  editDocument,
  updateDocument,
  changeEditDocumentModalState,
  removeDocument,

  loadReview,
  loadAllReviewsByProcessId,
  addReview,
  updateReview,
  removeReview,

  updateCriteriaCompliance,
  updateCriteriaField,
  updateVerificationCriteria,
};

export default verificationProcessManagementActions;
