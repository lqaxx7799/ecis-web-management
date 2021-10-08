import { CompanyRegistrationDTO } from '../../types/dto';
import { Company } from '../../types/models';
import request from '../utils/request';

function getAll(): Promise<Company[]> {
  return request.get(`/Company/GetAll`);
}

function getByAccountId(accountId: number): Promise<Company> {
  return request.get(`/Company/ByAccount/${accountId}`);
}

function getById(id: number): Promise<Company> {
  return request.get(`/Company/${id}`);
}

function registerCompany(payload: CompanyRegistrationDTO): Promise<CompanyRegistrationDTO> {
  return request.post('/Company/RegisterCompany', payload);
}

const companyServices = {
  getAll,
  getByAccountId,
  getById,
  registerCompany,
};

export default companyServices;
