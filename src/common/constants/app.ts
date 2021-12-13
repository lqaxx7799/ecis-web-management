export const DEFAULT_DATETIME_FORMAT = "DD/MM/YYYY HH:mm";

export const MODIFICATION_TYPE: { [key: string]: string } = {
  VERIFICATION: 'Tự đánh giá',
  VIOLATION: 'Khiếu nại vi phạm',
};

export const MAX_FILE_SIZE = 25 * 1024 * 1024;

export const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'doc', 'docx', 'xls', 'xlsx', 'pdf'];

const appConstants = {
  DEFAULT_DATETIME_FORMAT,
  MODIFICATION_TYPE,
  MAX_FILE_SIZE,
  ALLOWED_EXTENSIONS,
};

export default appConstants;
