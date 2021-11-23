import { Province } from '../../types/models';
import request from '../utils/request';

function getAll(): Promise<Province[]> {
  return request.get(`/Province/GetAll`);
}

const provinceServices = {
  getAll,
};

export default provinceServices;
