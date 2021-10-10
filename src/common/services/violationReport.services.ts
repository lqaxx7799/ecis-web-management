import { ViolationReportDTO } from '../../types/dto';
import { ViolationReport } from '../../types/models';
import request from '../utils/request';

function getAll(): Promise<ViolationReport[]> {
  return request.get(`/ViolationReport/GetAll`);
}

function getById(id: number): Promise<ViolationReport> {
  return request.get(`/ViolationReport/ById/${id}`);
}

function create(data: ViolationReportDTO): Promise<ViolationReport> {
  return request.post(`/ViolationReport/Create`, data);
}

function approve(id: number): Promise<ViolationReport> {
  return request.put(`/ViolationReport/Approve/${id}`);
}

function reject(id: number): Promise<ViolationReport> {
  return request.put(`/ViolationReport/Reject/${id}`);
}

const violationReportServices = {
  getAll,
  getById,
  create,
  approve,
  reject,
};

export default violationReportServices;
