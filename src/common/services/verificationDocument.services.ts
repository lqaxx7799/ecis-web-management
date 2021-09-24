import { VerificationDocument } from '../../types/models';
import request from '../utils/request';

function getAllByProcessId(processId: number): Promise<VerificationDocument[]> {
  return request.get(`/VerificationDocument/GetByProcessId/${processId}`);
}

function getById(id: number): Promise<VerificationDocument> {
  return request.get(`/VerificationDocument/${id}`);
}

function create(document: Partial<VerificationDocument>): Promise<VerificationDocument> {
  return request.post(`/VerificationDocument/Add`, document);
}

function update(document: Partial<VerificationDocument>): Promise<VerificationDocument> {
  return request.put(`/VerificationDocument/Update`, document);
}

function remove(id: number): Promise<void> {
  return request.del(`/VerificationDocument/Delete/${id}`);
}

const verificationDocumentServices = {
  getAllByProcessId,
  getById,
  create,
  update,
  remove,
};

export default verificationDocumentServices;
