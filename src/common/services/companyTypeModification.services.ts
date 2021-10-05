import { CompanyTypeModification } from '../../types/models';
import request from '../utils/request';

function getReportPrivate(month: number, year: number): Promise<CompanyTypeModification[]> {
  return request.get(`/Company/GetReportPrivate?month=${month}&year=${year}`);
}

function getReport(month: number, year: number): Promise<CompanyTypeModification[]> {
  return request.get(`/Company/GetReport?month=${month}&year=${year}`);
}

function update(data: Partial<CompanyTypeModification>): Promise<CompanyTypeModification> {
  return request.put(`/Company/UpdateModification`, data);
}

const companyTypeModificationServices = {
  getReportPrivate,
  getReport,
  update,
};

export default companyTypeModificationServices;
