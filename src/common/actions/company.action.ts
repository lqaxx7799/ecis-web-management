import { AppDispatch } from '../../app/store';
import { CompanyRegistrationDTO } from '../../types/dto';
import companyServices from '../services/company.services';
import { AppThunk } from './type';

function registerCompany(payload: CompanyRegistrationDTO): AppThunk<Promise<CompanyRegistrationDTO>> {
  return (dispatch: AppDispatch) => {
    return companyServices.registerCompany(payload);
  }
}

const companyActions = {
  registerCompany,
};

export default companyActions;
