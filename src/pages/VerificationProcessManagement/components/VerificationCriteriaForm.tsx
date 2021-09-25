import { Button, Menu, MenuLabel, MenuItem, Title, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { FileTextIcon, TrashIcon, UploadIcon } from "@radix-ui/react-icons";
import { FileIcon, DefaultExtensionType, defaultStyles } from 'react-file-icon';
import _ from 'lodash';
import { ChangeEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import fileServices from "../../../common/services/file.services";
import { Criteria, VerificationCriteria, VerificationDocument } from "../../../types/models";
import verificationProcessManagementActions from "../action";

type Props = {
  criteria?: Criteria;
  verificationCriteria: VerificationCriteria;
};

const VerificationCriteriaForm = ({ criteria, verificationCriteria }: Props) => {
  const notifications = useNotifications();
  const dispatch = useAppDispatch();

  const { verificationDocuments } = useAppSelector((state) => state.verificationProcessManagement);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredDocuments = _.filter(
    verificationDocuments, 
    (document) => document.verificationCriteriaId === verificationCriteria.id
  );

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const handleNewFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log(11111, files);
    if (files?.length) {
      fileServices.uploadFile(files[0])
        .then((result) => {
          const document: Partial<VerificationDocument> = {
            content: '',
            documentName: result.name,
            resourceSize: result.size,
            resourceType: result.type,
            resourceUrl: result.url,
            verificationCriteriaId: verificationCriteria.id,
            uploaderType: 'COMPANY',
          };
          dispatch(verificationProcessManagementActions.createDocument(document))
            .then((createdDocument) => {
              dispatch(verificationProcessManagementActions.changeEditDocumentModalState(true));
              dispatch(verificationProcessManagementActions.editDocument(createdDocument));
            });
        })
        .catch((err) => {
          notifications.showNotification({
            color: 'red',
            title: 'Lỗi hệ thống',
            message: 'Đã xảy ra lỗi trong quá trình tải file, vui lòng thử lại sau.',
          });
        });
    }
  };

  const onInitEditDocument = (document: VerificationDocument) => {
    dispatch(verificationProcessManagementActions.changeEditDocumentModalState(true));
    dispatch(verificationProcessManagementActions.editDocument(document));
  };

  const onRemoveDocument = (documentId: number) => {
    dispatch(verificationProcessManagementActions.removeDocument(documentId));
  };

  if (!criteria) {
    return null;
  }
  return (
    <div
      className="criteria-item"
    >
      <Title order={5}>{criteria?.criteriaName ?? ''}</Title>
      <div className="criteria-upload-wrapper">
        <div>
          {
            _.isEmpty(filteredDocuments)
              ? <Text style={{ marginBottom: '12px' }}>Bạn chưa thêm tài liệu</Text>
              : _.map(filteredDocuments, (document) => (
                <div className="uploaded-file-item" key={document.id}>
                  <div className="file-info">
                    <span className="file-icon-24">
                      <FileIcon
                        extension={document.resourceType}
                        {...defaultStyles[document.resourceType as DefaultExtensionType]}
                      />
                    </span>
                    <span className="file-name" onClick={() => onInitEditDocument(document)}>
                      {document.documentName}
                    </span>
                  </div>
                  <div>
                    <Menu>
                      <MenuLabel>Hành vi</MenuLabel>
                      <MenuItem
                        icon={<FileTextIcon />}
                        onClick={() => onInitEditDocument(document)}
                      >
                        Xem chi tiết
                      </MenuItem>
                      <MenuItem
                        icon={<TrashIcon />}
                        onClick={() => onRemoveDocument(document.id)}
                        color="red"
                      >
                        Xóa tài liệu
                      </MenuItem>
                    </Menu>
                  </div>
                </div> 
              ))
          }
        </div>
        <Button
          leftIcon={<UploadIcon />}
          onClick={openFileDialog}
        >
          Thêm tài liệu
        </Button>   
      </div>

      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleNewFileUpload}
      />
    </div>
  );
};

export default VerificationCriteriaForm;
