import { DocumentReview } from '../../types/models';
import request from '../utils/request';

function getAllByProcessId(processId: number): Promise<DocumentReview[]> {
  return request.get(`/DocumentReview/GetByProcessId/${processId}`);
}

function getAllByDocumentId(documentId: number): Promise<DocumentReview[]> {
  return request.get(`/DocumentReview/GetByDocumentId/${documentId}`);
}

function getById(id: number): Promise<DocumentReview> {
  return request.get(`/DocumentReview/${id}`);
}

function add(documentReview: Partial<DocumentReview>): Promise<DocumentReview> {
  return request.post('/DocumentReview/Add', documentReview);
}

function update(documentReview: Partial<DocumentReview>): Promise<DocumentReview> {
  return request.put('/DocumentReview/Update', documentReview);
}

function remove(id: number): Promise<void> {
  return request.del(`/DocumentReview/Delete/${id}`);
}

const documentReviewServices = {
  getAllByProcessId,
  getAllByDocumentId,
  getById,
  add,
  update,
  remove,
};

export default documentReviewServices;
