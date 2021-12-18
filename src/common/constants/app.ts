export const DEFAULT_DATETIME_FORMAT = "DD/MM/YYYY HH:mm";
export const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';

export const MODIFICATION_TYPE: { [key: string]: string } = {
  VERIFICATION: 'Tự đánh giá',
  VIOLATION: 'Khiếu nại vi phạm',
};

export const MAX_FILE_SIZE = 25 * 1024 * 1024;

export const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'doc', 'docx', 'xls', 'xlsx', 'pdf'];

export const GENDER_MAPPING: { [key: string]: string } = {
  male: 'Nam',
  female: 'Nữ',
  other: 'Khác',
};

const appConstants = {
  DEFAULT_DATETIME_FORMAT,
  DEFAULT_DATE_FORMAT,
  MODIFICATION_TYPE,
  MAX_FILE_SIZE,
  ALLOWED_EXTENSIONS,
  GENDER_MAPPING,
};

export default appConstants;
