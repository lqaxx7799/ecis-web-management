import { CriteriaType } from '../../types/models';
import request from '../utils/request';

function getAll(): Promise<CriteriaType[]> {
  return request.get('/CriteriaType');
}

function getById(id: number): Promise<CriteriaType> {
  return request.get(`/CriteriaType/${id}`);
}

const criteriaTypeServices = {
  getAll,
  getById,
};

export default criteriaTypeServices;
