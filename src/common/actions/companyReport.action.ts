import _ from "lodash";
import { AppDispatch } from '../../app/store';
import { CompanyReport } from '../../types/models';
import { CompanyReportActionTypes } from "../reducers/companyReport.reducer";
import companyReportServices from "../services/companyReport.services";
import companyReportDocumentServices from "../services/companyReportDocument.services";
import { AppThunk } from './type';

function getAll(): AppThunk<Promise<CompanyReport[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<CompanyReportActionTypes>({
      type: 'COMPANY_REPORT_LOADING',
    });
    try {
      const result = await companyReportServices.getAll();
      dispatch<CompanyReportActionTypes>({
        type: 'COMPANY_REPORT_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<CompanyReportActionTypes>({
        type: 'COMPANY_REPORT_LOAD_FAILED',
      });
      throw e;
    }
  };
}

function getById(id: number): AppThunk<Promise<CompanyReport>> {
  return async (dispatch: AppDispatch) => {
    dispatch<CompanyReportActionTypes>({
      type: 'COMPANY_REPORT_LOADING',
    });
    try {
      const [report, documents] = await Promise.all([
        companyReportServices.getById(id),
        companyReportDocumentServices.getByReportId(id),
      ]);
      dispatch<CompanyReportActionTypes>({
        type: 'COMPANY_REPORT_DETAIL_LOADED',
        payload: {
          companyReport: report,
          companyReportDocuments: documents,
        },
      });
      return report;
    } catch (e) {
      dispatch<CompanyReportActionTypes>({
        type: 'COMPANY_REPORT_LOAD_FAILED',
      });
      throw e;
    }
  };
}

function approve(id: number): AppThunk<Promise<CompanyReport>> {
  return async (dispatch: AppDispatch, getState) => {
    const result = await companyReportServices.approve(id);
    const state = getState();
    const currentList = state.companyReport.companyReports;
    const updatedList = _.map(currentList, (report) => report.id === id ? result : report);
    dispatch<CompanyReportActionTypes>({
      type: 'COMPANY_REPORT_LOADED',
      payload: updatedList,
    });
    dispatch<CompanyReportActionTypes>({
      type: 'COMPANY_REPORT_DETAIL_EDITED',
      payload: result,
    });
    return result;
  };
}

function reject(id: number): AppThunk<Promise<CompanyReport>> {
  return async (dispatch: AppDispatch, getState) => {
    const result = await companyReportServices.reject(id);
    const state = getState();
    const currentList = state.companyReport.companyReports;
    const updatedList = _.map(currentList, (report) => report.id === id ? result : report);
    dispatch<CompanyReportActionTypes>({
      type: 'COMPANY_REPORT_LOADED',
      payload: updatedList,
    });
    dispatch<CompanyReportActionTypes>({
      type: 'COMPANY_REPORT_DETAIL_EDITED',
      payload: result,
    });
    return result;
  };
}

const companyReportActions = {
  getAll,
  getById,
  approve,
  reject,
};

export default companyReportActions;
