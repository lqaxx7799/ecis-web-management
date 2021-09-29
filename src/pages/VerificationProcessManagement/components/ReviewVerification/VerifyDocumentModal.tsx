import { Button, Group, Modal, Paper, Table, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { ExternalLinkIcon, FileIcon, PlusIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import { DefaultExtensionType, defaultStyles } from "react-file-icon";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { DEFAULT_DATETIME_FORMAT } from "../../../../common/constants/app";
import helpers from "../../../../common/utils/helpers";
import config from "../../../../config";
import { DocumentReview, VerificationDocument } from "../../../../types/models";
import verificationProcessManagementActions from "../../action";

type Props = {

};

const VerifyDocumentModal = (props: Props) => {
  const dispatch = useAppDispatch();
  const notifications = useNotifications();
  const {
    showEditingDocumentModal,
    editingDocument,
    editingProcess,
    documentReviews,
  } = useAppSelector((state) => state.verificationProcessManagement);
  const [isAddingReview, setAddingReview] = useState(false);
  const [editingReviewContent, setEditingReviewContent] = useState('');

  useEffect(() => {
    if (editingDocument) {
      dispatch(verificationProcessManagementActions.loadReview(editingDocument.id));
    }
    setAddingReview(false);
    setEditingReviewContent('');
  }, [editingDocument?.id]);

  const closeEditingDocument = () => {
    dispatch(verificationProcessManagementActions.editDocument(undefined));
    dispatch(verificationProcessManagementActions.changeEditDocumentModalState(false));
  };

  const cancelReview = () => {
    setAddingReview(false);
    setEditingReviewContent('');
  };

  const addReview = () => {
    const newReview: Partial<DocumentReview> = {
      content: editingReviewContent,
      verificationDocumentId: editingDocument?.id,
    };
    dispatch(verificationProcessManagementActions.addReview(newReview))
      .then(() => {
        setAddingReview(false);
        setEditingReviewContent('');
      })
      .catch(() => {
        notifications.showNotification({
          color: 'red',
          title: 'Lỗi hệ thống',
          message: 'Đã xảy ra lỗi trong quá trình lưu, vui lòng thử lại sau.',
        });
      });
  };

  return (
    <Modal
      opened={showEditingDocumentModal}
      onClose={closeEditingDocument}
      title="Nhận xét tài liệu"
      size="xl"
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
          <tr>
            <td>Mô tả</td>
            <td>{editingDocument?.content}</td>
          </tr>
        </tbody>
      </Table>

      <div style={{ marginTop: '24px' }}>
        <Title order={4}>Nhận xét tài liệu</Title>
        {
          _.map(documentReviews, (review) => (
            <div style={{ marginBottom: '8px' }} key={review.id}>
              <Text>{review.content}</Text>
              <Text color="gray" size="sm">
                Ngày tạo: {dayjs(review.createdAt).format(DEFAULT_DATETIME_FORMAT)}
              </Text>
            </div>
          ))
        }
        {
          isAddingReview && (
            <Paper style={{ marginTop: '12px', padding: '12px' }} shadow="md">
              <Textarea
                label="Nội dung đánh giá"
                required
                placeholder="Nhập nội dung đánh giá"
                value={editingReviewContent}
                onChange={(e) => setEditingReviewContent(e.target.value)}
              />
              <Group style={{ marginTop: '8px' }}>
                <Button onClick={addReview}>
                  Lưu
                </Button>
                <Button onClick={cancelReview} variant="light">
                  Hủy
                </Button>
              </Group>
            </Paper>
          )
        }
        <Button
          disabled={editingProcess?.isReviewed}
          style={{ marginTop: '12px' }}
          leftIcon={<PlusIcon />}
          onClick={() => setAddingReview(true)}
        >
          Thêm nhận xét
        </Button>
      </div>
    </Modal>
  );
};

export default VerifyDocumentModal;
