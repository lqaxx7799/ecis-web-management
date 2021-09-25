import { Button, Modal, Table, Text, Textarea } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { ExternalLinkIcon, FileIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { DefaultExtensionType, defaultStyles } from "react-file-icon";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { DEFAULT_DATETIME_FORMAT } from "../../../common/constants/app";
import helpers from "../../../common/utils/helpers";
import config from "../../../config";
import { VerificationDocument } from "../../../types/models";
import verificationProcessManagementActions from "../action";

type Props = {

};

const EditDocumentModal = (props: Props) => {
  const notifications = useNotifications();
  const dispatch = useAppDispatch();
  const {
    showEditingDocumentModal,
    editingDocument,
  } = useAppSelector((state) => state.verificationProcessManagement);

  const onEditDocument = (key: string, value: any) => {
    const updatedDocument = {
      ...editingDocument,
      [key]: value,
    };
    dispatch(verificationProcessManagementActions.editDocument(updatedDocument as VerificationDocument));
  };

  const updateDocument = () => {
    if (!editingDocument) {
      return;
    }
    dispatch(verificationProcessManagementActions.updateDocument(editingDocument))
      .then(() => closeEditingDocument())
      .catch(() => {
        notifications.showNotification({
          color: 'red',
          title: 'Lỗi hệ thống',
          message: 'Đã xảy ra lỗi trong quá trình cập nhật, vui lòng thử lại sau.',
        });
      });
  };

  const closeEditingDocument = () => {
    dispatch(verificationProcessManagementActions.editDocument(undefined));
    dispatch(verificationProcessManagementActions.changeEditDocumentModalState(false));
  };

  return (
    <Modal
      opened={showEditingDocumentModal}
      onClose={closeEditingDocument}
      title="Chỉnh sửa thông tin file"
      size="lg"
    >
      <span style={{ display: 'flex', alignItems: 'center', marginBottom: '18px' }}>
        <span className="file-icon-24">
          <FileIcon
            extension={editingDocument?.resourceType}
            {...defaultStyles[editingDocument?.resourceType as DefaultExtensionType]}
          />
        </span>
        <Text
          variant="link"
          component="a"
          href={`${config.BASE_API}/${editingDocument?.resourceUrl}`}
          rel="noreffer noopener"
          target="_blank"
        >
          {editingDocument?.documentName}
          <ExternalLinkIcon style={{ marginLeft: '4px' }} />
        </Text>
      </span>

      <Table
        striped
        highlightOnHover
        style={{ marginBottom: '18px' }}
      >
        <tbody>
          <tr>
            <td>Tên file</td>
            <td>{editingDocument?.documentName}</td>
          </tr>
          <tr>
            <td>Kiểu file</td>
            <td>{editingDocument?.resourceType}</td>
          </tr>
          <tr>
            <td>Kích thước file</td>
            <td>{helpers.bytesToSize(editingDocument?.resourceSize ?? 0)}</td>
          </tr>
          <tr>
            <td>Ngày tải lên</td>
            <td>{dayjs(editingDocument?.createdAt).format(DEFAULT_DATETIME_FORMAT)}</td>
          </tr>
        </tbody>
      </Table>
      <Textarea
        style={{ marginBottom: '18px' }}
        label="Mô tả"
        placeholder="Nhập mô tả file"
        value={editingDocument?.content}
        onChange={(e) => onEditDocument('content', e.target.value)}
      />
      <Button
        onClick={updateDocument}
      >
        Cập nhật
      </Button>
    </Modal>
  );
};

export default EditDocumentModal;
