import _ from "lodash";
import { AppDispatch } from '../../app/store';
import { CompanyTypeModification } from '../../types/models';
import companyTypeModificationReducer, { CompanyTypeModificationActionTypes } from '../reducers/companyTypeModification.reducer';
import companyTypeModificationServices from '../services/companyTypeModification.services';
import { AppThunk } from './type';

function getReportPrivate(month: number, year: number): AppThunk<Promise<CompanyTypeModification[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<CompanyTypeModificationActionTypes>({
      type: 'COMPANY_TYPE_MODIFICATION_LOADING',
    });
    try {
      const result = await companyTypeModificationServices.getReportPrivate(month, year);
      dispatch<CompanyTypeModificationActionTypes>({
        type: 'COMPANY_TYPE_MODIFICATION_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<CompanyTypeModificationActionTypes>({
        type: 'COMPANY_TYPE_MODIFICATION_LOAD_FAILED',
      });
      return [];
    }
  };
}

function update(data: Partial<CompanyTypeModification>): AppThunk<Promise<CompanyTypeModification>> {
  return async (dispatch: AppDispatch, getState) => {
    dispatch<CompanyTypeModificationActionTypes>({
      type: 'COMPANY_TYPE_MODIFICATION_LOADING',
    });
    try {
      const result = await companyTypeModificationServices.update(data);
      const state = getState();
      const { companyTypeModifications } = state.companyTypeModification;
      const updatedList = _.map(companyTypeModifications, (item) => item.id === result.id ? result : item);
      dispatch<CompanyTypeModificationActionTypes>({
        type: 'COMPANY_TYPE_MODIFICATION_LOADED',
        payload: updatedList,
      });
      return result;
    } catch (e) {
      dispatch<CompanyTypeModificationActionTypes>({
        type: 'COMPANY_TYPE_MODIFICATION_LOAD_FAILED',
      });
      throw e;
    }
  };
}

const companyTypeModificationActions = {
  getReportPrivate,
  update,
};

export default companyTypeModificationActions;
