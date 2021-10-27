import { CriteriaDetail } from '../../types/models';
import request from '../utils/request';

function getAll(): Promise<CriteriaDetail[]> {
  return request.get('/CriteriaDetail');
}

function getById(id: number): Promise<CriteriaDetail> {
  return request.get(`/CriteriaDetail/${id}`);
}

const criteriaDetailServices = {
  getAll,
  getById,
};

export default criteriaDetailServices;
