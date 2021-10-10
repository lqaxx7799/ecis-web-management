import { ViolationReportDocument } from '../../types/models';
import request from '../utils/request';

function getByReportId(reportId: number): Promise<ViolationReportDocument[]> {
  return request.get(`/ViolationReportDocument/GetByReport/${reportId}`);
}

const violationReportDocumentServices = {
  getByReportId,
};

export default violationReportDocumentServices;
