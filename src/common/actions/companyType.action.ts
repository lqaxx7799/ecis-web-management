import { AppDispatch } from '../../app/store';
import { CompanyType } from '../../types/models';
import { CompanyTypeActionTypes } from '../reducers/companyType.reducer';
import companyTypeServices from '../services/companyType.services';
import { AppThunk } from './type';

function getAll(): AppThunk<Promise<CompanyType[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<CompanyTypeActionTypes>({
      type: 'COMPANY_TYPE_LOADING',
    });
    try {
      const result = await companyTypeServices.getAll();
      dispatch<CompanyTypeActionTypes>({
        type: 'COMPANY_TYPE_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<CompanyTypeActionTypes>({
        type: 'COMPANY_TYPE_LOAD_FAILED',
      });
      return [];
    }
  }
}

const companyTypeActions = {
  getAll,
};

export default companyTypeActions;
