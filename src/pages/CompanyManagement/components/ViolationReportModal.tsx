import { Button, Group, Modal, Table, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import _ from "lodash";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyTypeActions from "../../../common/actions/companyType.action";
import violationReportActions from "../../../common/actions/violationReport.action";
import FileInfo from "../../../common/components/FileInfo";

type Props = {
  isOpening: boolean;
};

const ViolationReportModal = (props: Props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const notifications = useNotifications();

  const { editingViolationReport, violationReportDocuments } = useAppSelector((state) => state.violationReport);
  const { companyTypes } = useAppSelector((state) => state.companyType);

  useEffect(() => {
    dispatch(companyTypeActions.getAll());
  }, [dispatch]);

  const closeModal = () => {
    history.push('/doanh-nghiep/duyet-bao-cao');    
  };

  const approveReport = () => {
    dispatch(violationReportActions.approve(editingViolationReport?.id ?? 0))
      .then(() => {
        notifications.showNotification({
          color: 'green',
          title: 'Xác nhận thành công',
          message: 'Xác nhận doanh nghiệp vi phạm thành công.',
        });
        closeModal();
      })
      .catch(() => {
        notifications.showNotification({
          color: 'red',
          title: 'Lỗi hệ thống',
          message: 'Đã có lỗi xảy ra trong quá trình xác nhận vi phạm. Xin vui lòng thử lại sau.',
        });
      });
  };

  const rejectReport = () => {
    dispatch(violationReportActions.reject(editingViolationReport?.id ?? 0))
      .then(() => {
        notifications.showNotification({
          color: 'green',
          title: 'Từ chối thành công',
          message: 'Từ chối doanh nghiệp vi phạm thành công.',
        });
        closeModal();
      })
      .catch(() => {
        notifications.showNotification({
          color: 'red',
          title: 'Lỗi hệ thống',
          message: 'Đã có lỗi xảy ra trong quá trình từ chối vi phạm. Xin vui lòng thử lại sau.',
        });
      });
  };

  const currentType = _.find(companyTypes, (type) => type.id === editingViolationReport?.company?.companyTypeId);

  return (
    <Modal
      size="xl"
      opened={props.isOpening}
      onClose={closeModal}
      title="Chi tiết báo cáo vi phạm"
    >
      <div style={{ marginTop: '24px' }}>
        <Title order={3} style={{ marginBottom: '12px' }}>Thông tin doanh nghiệp</Title>
        <Table>
          <tbody>
            <tr>
              <td style={{ width: '300px' }}>Tên doanh nghiệp (Tiếng Việt)</td>
              <td>{editingViolationReport?.company?.companyNameVI}</td>
            </tr>
            <tr>
              <td>Tên doanh nghiệp (Tiếng Anh)</td>
              <td>{editingViolationReport?.company?.companyNameEN ?? '-'}</td>
            </tr>
            <tr>
              <td>Mã doanh nghiệp</td>
              <td>{editingViolationReport?.company?.companyCode}</td>
            </tr>
            <tr>
              <td>Loại hiện tại</td>
              <td>{currentType?.typeName ?? 'Chưa đánh giá'}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div style={{ marginTop: '24px' }}>
        <Title order={3}>Tài liệu vi phạm</Title>
        {
          _.map(violationReportDocuments, (document) => (
            <FileInfo
              data={{
                name: document.documentName,
                size: document.documentSize,
                type: document.documentType,
                url: document.documentUrl,
              }}
            />
          ))
        }
      </div>
      <div style={{ marginTop: '24px' }}>
        <Group>
          <Button onClick={approveReport}>
            Xác nhận
          </Button>
          <Button onClick={rejectReport} variant="light">
            Từ chối
          </Button>
          <Button variant="light" onClick={closeModal}>
            Hủy
          </Button>
        </Group>
      </div>
    </Modal>
  );
};

export default ViolationReportModal;
