import { Button, Text, Tooltip } from '@mantine/core';
import { TrashIcon, UploadIcon } from '@radix-ui/react-icons';
import { ChangeEvent, ChangeEventHandler, useRef, useState } from "react";
import './file-upload.scss';

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;
const KILO_BYTES_PER_BYTE = 1024;

const convertBytesToKB = (bytes: number) =>
  Math.round(bytes / KILO_BYTES_PER_BYTE);

const convertNestedObjectToArray = (nestedObj: {[key: string]: any}) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

type Props = {
  onUpdateFiles?: (files: File[]) => void;
  maxFileSizeInBytes?: number;
  uploadText?: string;
  multiple?: boolean;
  children?: React.ReactNode;
};

type FileType = {
  [key: string]: File;
};

const FileUpload = ({
  onUpdateFiles,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  children,
  uploadText,
  ...otherProps
}: Props) => {
  const fileInputField = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileType>({});

  const handleUploadBtnClick = () => {
    fileInputField?.current?.click();
  };

  const addNewFiles = (newFiles: FileList) => {
    for (let file of newFiles) {
      if (file.size < maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files: FileType) => {
    const filesAsArray = convertNestedObjectToArray(files);
    onUpdateFiles?.(filesAsArray);
  };

  const handleNewFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = e.target;
    if (newFiles?.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName: string) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  const renderPreview = () => {
    return Object.keys(files).map((fileName, index) => {
      let file = files[fileName];
      let isImageFile = file.type.split("/")[0] === "image";
      return (
        <section className="preview-container" key={fileName}>
          <div>
            {isImageFile && (
              <img
                className="image-preview"
                src={URL.createObjectURL(file)}
                alt={`file preview ${index}`}
              />
            )}
            <div className="file-meta-data">
              <Tooltip
                label={file.name}
                withArrow
              >
                <span className="file-name">{file.name}</span>
              </Tooltip>
              <aside>
                <span>{convertBytesToKB(file.size)} kb</span>
                <TrashIcon onClick={() => removeFile(fileName)} />
              </aside>
            </div>
          </div>
        </section>
      );
    });
  };

  return (
    <>
      <div className="file-upload-container">
        <Button type="button" onClick={handleUploadBtnClick}>
          <UploadIcon />
          <span>{uploadText || 'Upload'}</span>
        </Button>
        <input
          type="file"
          className="form-field"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </div>
      <article className="file-preview-container">
        <section className="preview-list">
          {
            Object.keys(files).length === 0 ? (
              <span>Bạn chưa tải lên tài liệu</span>
            ) : renderPreview()
          }
        </section>
      </article>
    </>
  );
};

export default FileUpload;
