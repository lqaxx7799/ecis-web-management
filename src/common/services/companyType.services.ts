import { CompanyType } from '../../types/models';
import request from '../utils/request';

function getAll(): Promise<CompanyType[]> {
  return request.get(`/CompanyType/GetAll`);
}

function getById(id: number): Promise<CompanyType> {
  return request.get(`/CompanyType/${id}`);
}

const companyTypeServices = {
  getAll,
  getById,
};

export default companyTypeServices;
