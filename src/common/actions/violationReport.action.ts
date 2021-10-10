import _ from "lodash";
import { AppDispatch } from '../../app/store';
import { ViolationReportDTO } from "../../types/dto";
import { ViolationReport } from '../../types/models';
import { ViolationReportActionTypes } from "../reducers/violationReport.reducer";
import violationReportServices from "../services/violationReport.services";
import violationReportDocumentServices from "../services/violationReportDocument.services";
import { AppThunk } from './type';

function getAll(): AppThunk<Promise<ViolationReport[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<ViolationReportActionTypes>({
      type: 'VIOLATION_REPORT_LOADING',
    });
    try {
      const result = await violationReportServices.getAll();
      dispatch<ViolationReportActionTypes>({
        type: 'VIOLATION_REPORT_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<ViolationReportActionTypes>({
        type: 'VIOLATION_REPORT_LOAD_FAILED',
      });
      throw e;
    }
  };
}

function getById(id: number): AppThunk<Promise<ViolationReport>> {
  return async (dispatch: AppDispatch) => {
    dispatch<ViolationReportActionTypes>({
      type: 'VIOLATION_REPORT_LOADING',
    });
    try {
      const [report, documents] = await Promise.all([
        violationReportServices.getById(id),
        violationReportDocumentServices.getByReportId(id),
      ]);
      dispatch<ViolationReportActionTypes>({
        type: 'VIOLATION_REPORT_DETAIL_LOADED',
        payload: {
          violationReport: report,
          violationReportDocuments: documents,
        },
      });
      return report;
    } catch (e) {
      dispatch<ViolationReportActionTypes>({
        type: 'VIOLATION_REPORT_LOAD_FAILED',
      });
      throw e;
    }
  };
}

function create(data: ViolationReportDTO): AppThunk<Promise<ViolationReport>> {
  return async (dispatch: AppDispatch) => {
    return violationReportServices.create(data);
  };
}

const violationReportActions = {
  getAll,
  getById,
  create,
};

export default violationReportActions;
