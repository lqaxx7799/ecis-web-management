import { AppDispatch, RootState } from "../../app/store";
import criteriaActions from "../../common/actions/criteria.action";
import criteriaTypeActions from "../../common/actions/criteriaType.action";
import { AppThunk } from "../../common/actions/type";
import verificationCriteriaServices from "../../common/services/verificationCriteria.services";
import verificationDocumentServices from "../../common/services/verificationDocument.services";
import verificationProcessServices from "../../common/services/verificationProcess.services";
import { VerificationDocument, VerificationProcess } from "../../types/models";
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
      ]);
      dispatch<VerificationProcessManagementActionTypes>({
        type: 'VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADED',
        payload: {
          editingProcess: process,
          verificationCriterias: criterias,
          verificationDocuments: documents,
        },
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

const verificationProcessManagementActions = {
  loadSelfVerification,
  createDocument,
  editDocument,
  updateDocument,
  changeEditDocumentModalState,
  removeDocument,
};

export default verificationProcessManagementActions;
