import { AppDispatch } from "../../app/store";
import criteriaDetailActions from "../../common/actions/criteriaDetail.action";
import { AppThunk } from "../../common/actions/type";
import verificationCriteriaServices from "../../common/services/verificationCriteria.services";
import verificationProcessServices from "../../common/services/verificationProcess.services";
import { VerificationProcess } from "../../types/models";
import { VerificationProcessManagementActionTypes } from "../VerificationProcessManagement/reducer";

function getCompanyCurrentPending(companyId: number): AppThunk<Promise<VerificationProcess>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationProcessManagementActionTypes>({
      type: 'VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADING',
    });
    const process = await verificationProcessServices.getCurrentPendingByCompanyId(companyId);
    if (!process) {
      dispatch<VerificationProcessManagementActionTypes>({
        type: 'VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADED',
        payload: {
          editingProcess: process,
          verificationCriterias: [],
          verificationDocuments: [],
        },
      });
      throw new Error();
    }
    try {
      const criterias = await verificationCriteriaServices.getAllByProcessId(process.id);
      dispatch<VerificationProcessManagementActionTypes>({
        type: 'VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOADED',
        payload: {
          editingProcess: process,
          verificationCriterias: criterias,
          verificationDocuments: [],
        },
      });   
      return process;
    } catch (e) {
      dispatch<VerificationProcessManagementActionTypes>({
        type: 'VERIFICATION_PROCESS_MANAGEMENT_DETAIL_LOAD_FAILED',
      });
      throw e;
    }
  };
}

const assignVerifyActions = {
  getCompanyCurrentPending,
};

export default assignVerifyActions;
