import { CompanyReportDocument } from '../../types/models';
import request from '../utils/request';

function getByReportId(reportId: number): Promise<CompanyReportDocument[]> {
  return request.get(`/CompanyReportDocument/GetByReport/${reportId}`);
}

const companyReportDocumentServices = {
  getByReportId,
};

export default companyReportDocumentServices;
