import { Role } from '../../types/models';
import request from '../utils/request';

function getById(roleId: number): Promise<Role> {
  return request.get(`/Role/${roleId}`);
}

const roleServices = {
  getById,
};

export default roleServices;
