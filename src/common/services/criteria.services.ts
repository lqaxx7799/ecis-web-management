import { Criteria } from '../../types/models';
import request from '../utils/request';

function getAll(): Promise<Criteria[]> {
  return request.get('/Criteria');
}

function getById(id: number): Promise<Criteria> {
  return request.get(`/Criteria/${id}`);
}

const criteriaServices = {
  getAll,
  getById,
};

export default criteriaServices;
