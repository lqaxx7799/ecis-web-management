import { Badge, Button, Group, LoadingOverlay, Modal, Tab, Table, Tabs, Text, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationProcessManagementActions from "../action";
import VerifyDocumentModal from "./VerifyDocumentModal";
import VerifyPendingProcessCriteriaGroup from "./VerifyPendingProcessCriteriaGroup";

type Props = {

};

type RouteParams = {
  id: string;
};

const VerifyPendingProcessDetail = (props: Props) => {
  const notifications = useNotifications();
  const dispatch = useAppDispatch();
  const {
    company,
    editingProcess,
    loading,
    verificationCriterias,
  } = useAppSelector((state) => state.verificationProcessManagement);
  const { criterias } = useAppSelector((state) => state.criteria);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);
  const { companyTypes } = useAppSelector((state) => state.companyType);

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  let { id } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(verificationProcessManagementActions.loadSelfVerification(parseInt(id)));
  }, []);

  const submitVerify = () => {
    dispatch(verificationProcessManagementActions.submitVerifyReview(parseInt(id)))
      .then(() => {
        notifications.showNotification({
          color: 'green',
          title: 'Thành công',
          message: 'Lưu đánh giá thành công',
        });
        setShowSubmitModal(false);
      })
      .catch(() => {
        notifications.showNotification({
          color: 'red',
          title: 'Lỗi hệ thống',
          message: 'Đã có lỗi xảy ra trong quá trình lưu đánh giá doanh nghiệp',
        });
      });
  };

  const groupedCriteria = _.groupBy(verificationCriterias, (editingCriteria) => {
    const found = _.find(criterias, criteria => criteria.id === editingCriteria.criteriaId);
    return found?.criteriaTypeId;
  });

  const currentType = _.find(companyTypes, (type) => type.id === company?.companyTypeId);

  return (
    <div className="verify-pending-process-detail">
      <Helmet>
        <title>Đánh giá tài liệu doanh nghiệp</title>
      </Helmet>
      <LoadingOverlay visible={loading} />
      <Title order={1}>Đánh giá tài liệu doanh nghiệp</Title>
      <Button
        style={{ marginTop: '12px' }}
        component={Link}
        leftIcon={<ChevronLeftIcon />}
        to="/qua-trinh-danh-gia/phan-loai"
      >
        Quay lại
      </Button>

      <div style={{ marginTop: '24px'}}>
        <Title order={3} style={{ marginBottom: '12px' }}>Trạng thái hiện tại</Title>
        {
          !editingProcess?.isReviewed ? (
            <Badge color="green">Đang đánh giá</Badge>
          ) : (
            <Badge color="orange">Đã đánh giá</Badge>
          )
        }
      </div>

      <div style={{ marginTop: '24px'}}>
        <Title order={3} style={{ marginBottom: '12px' }}>Thông tin doanh nghiệp</Title>
        <Table>
          <tbody>
            <tr>
              <td style={{ width: '300px' }}>Tên doanh nghiệp (Tiếng Việt)</td>
              <td>{company?.companyNameVI}</td>
            </tr>
            <tr>
              <td>Tên doanh nghiệp (Tiếng Anh)</td>
              <td>{company?.companyNameEN ?? '-'}</td>
            </tr>
            <tr>
              <td>Mã doanh nghiệp</td>
              <td>{company?.companyCode}</td>
            </tr>
            <tr>
              <td>Loại hiện tại</td>
              <td>{currentType?.typeName ?? 'Chưa đánh giá'}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div style={{ marginTop: '24px' }}>
        <Title order={3} style={{ marginBottom: '12px' }}>Đánh giá tài liệu</Title>
        {
          !_.isEmpty(Object.keys(groupedCriteria)) && (
            <Tabs>
              {
                Object.keys(groupedCriteria).map((criteriaTypeId) => {
                  const criteriaType = _.find(criteriaTypes, type => type.id === parseInt(criteriaTypeId));
      
                  const criteriaList = groupedCriteria[criteriaTypeId];
                  return (
                    <Tab
                      label={criteriaType?.criteriaTypeName ?? ''}
                      key={criteriaTypeId}
                    >
                      <VerifyPendingProcessCriteriaGroup
                        verificationCriterias={criteriaList}
                      />
                    </Tab>
                  );
                })
              }
            </Tabs>
          )
        }
      </div>

      <div style={{ marginTop: '24px' }}>
        <Title order={3} style={{ marginBottom: '12px' }}>Hoàn thành</Title>
        <Button
          disabled={editingProcess?.isReviewed}
          onClick={() => setShowSubmitModal(true)}
        >
          Lưu kết quả
        </Button>
      </div>

      <Modal
        opened={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Xác nhận lưu kết quá đánh giá"
      >
        <Text style={{ marginBottom: '24px' }}>
          Vui lòng kiểm tra kết quả đánh giá trước khi lưu. Sau khi lưu kết quả, thông tin đánh giá sẽ được chuyển cho bên
          tiếp nhận để phân loại doanh nghiệp.
        </Text>
        <Group>
          <Button onClick={submitVerify}>Xác nhận</Button>
          <Button variant="light" onClick={() => setShowSubmitModal(false)}>Hủy</Button>
        </Group>
      </Modal>
      <VerifyDocumentModal />
    </div>
  );
};

export default VerifyPendingProcessDetail;
