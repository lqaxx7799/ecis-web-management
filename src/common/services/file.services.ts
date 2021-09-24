import { UploadFileResponseDTO } from '../../types/dto';
import request from '../utils/request';

function uploadFile(file: File): Promise<UploadFileResponseDTO> {
  const formData = new FormData();
  formData.append('File', file);
  return request.post('/File', formData);
}

const fileServices = {
  uploadFile,
};

export default fileServices;
