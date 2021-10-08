import { AppDispatch } from '../../app/store';
import { CompanyRegistrationDTO } from '../../types/dto';
import { Company } from '../../types/models';
import { CompanyActionTypes } from '../reducers/company.reducer';
import companyServices from '../services/company.services';
import { AppThunk } from './type';

function getAll(): AppThunk<Promise<Company[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<CompanyActionTypes>({
      type: 'COMPANY_LOADING',
    });
    try {
      const data = await companyServices.getAll();
      dispatch<CompanyActionTypes>({
        type: 'COMPANY_LOADED',
        payload: data,
      });
      return data;
    } catch (e) {
      dispatch<CompanyActionTypes>({
        type: 'COMPANY_LOAD_FAILED',
      });
      throw e;
    }
  };
}

function registerCompany(payload: CompanyRegistrationDTO): AppThunk<Promise<CompanyRegistrationDTO>> {
  return (dispatch: AppDispatch) => {
    return companyServices.registerCompany(payload);
  };
}

const companyActions = {
  getAll,
  registerCompany,
};

export default companyActions;
