import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE } from "../constants/app";

function bytesToSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function getFileExtension(fileName: string): string {
  const arr = fileName.split('.');
  if (!arr.length) {
    return '';
  }
  return arr[arr.length - 1].toLowerCase();
}

function validateUploadedFiles(fileList: FileList): string {
  const fileArray = Array.from(fileList);
  for (let i = 0; i < fileArray.length; i++) {
    const file = fileArray[i];
    if (
      !ALLOWED_EXTENSIONS.includes(getFileExtension(file.name)) ||
      file.size > MAX_FILE_SIZE
    ) {
      return 'Kiểu tập tin không hỗ trợ hoặc dung lượng quá lớn. Vui lòng kiểm tra lại.';
    }
  }
  return '';
}

const helpers = {
  bytesToSize,
  getFileExtension,
  validateUploadedFiles,
};

export default helpers;
