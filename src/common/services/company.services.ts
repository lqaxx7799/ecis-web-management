import { CompanyRegistrationDTO } from '../../types/dto';
import { Company } from '../../types/models';
import request from '../utils/request';

function getByAccountId(accountId: number): Promise<Company> {
  return request.get(`/Company/ByAccount/${accountId}`);
}

function registerCompany(payload: CompanyRegistrationDTO): Promise<CompanyRegistrationDTO> {
  return request.post('/Company/RegisterCompany', payload);
}

const companyServices = {
  getByAccountId,
  registerCompany,
};

export default companyServices;
