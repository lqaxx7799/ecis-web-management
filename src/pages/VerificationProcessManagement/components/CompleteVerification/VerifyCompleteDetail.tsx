import { Button, Drawer, Group, LoadingOverlay, Modal, Paper, Select, SelectItemProps, Tab, Table, Tabs, Text, Title, Tooltip } from "@mantine/core";
import { SelectDataItem } from "@mantine/core/lib/src/components/Select/types";
import { useNotifications } from "@mantine/notifications";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import verificationConfirmRequirementActions from "../../../../common/actions/verificationConfirmRequirement.action";
import FileInfo from "../../../../common/components/FileInfo";
import { DEFAULT_DATETIME_FORMAT } from "../../../../common/constants/app";
import { VerificationProcess } from "../../../../types/models";
import verificationProcessManagementActions from "../../action";
import ConfirmRequireModal from "./ConfirmRequireModal";
import VerifyCompleteCriteriaGroup from "./VerifyCompleteCriteriaGroup";

type Props = {

};

type RouteParams = {
  id: string;
};

const VerifyCompleteDetail = (props: Props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const notifications = useNotifications();

  const { id: processId } = useParams<RouteParams>();

  useEffect(() => {
    const parsedProcessId = parseInt(processId);
    dispatch(verificationProcessManagementActions.loadSelfVerification(parsedProcessId))
      .then(() => {
        dispatch(verificationConfirmRequirementActions.getByProcessId(parsedProcessId));
        dispatch(verificationProcessManagementActions.loadAllReviewsByProcessId(parsedProcessId));
      });
  }, [processId]);

  const { companyTypes } = useAppSelector((state) => state.companyType);
  const { criterias } = useAppSelector((state) => state.criteria);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);
  const { editingRequirement } = useAppSelector((state) => state.verificationConfirmRequirement);
  const {
    company,
    editingProcess,
    loading,
    verificationCriterias,
  } = useAppSelector((state) => state.verificationProcessManagement);

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showConfirmRequireModal, setShowConfirmRequireModal] = useState(false);

  const submitComplete = () => {
    dispatch(verificationProcessManagementActions.finishVerify(editingProcess?.id ?? 0))
      .then(() => {
        history.push('/qua-trinh-danh-gia/xac-nhan');
        notifications.showNotification({
          color: 'green',
          title: 'Thành công',
          message: 'Phân loại thành công',
        });
      })
      .catch(() => {
        notifications.showNotification({
          color: 'red',
          title: 'Lỗi hệ thống',
          message: 'Đã có lỗi xảy ra trong quá trình phân loại. Vui lòng thử lại sau.',
        });
      });
  };

  const changeProcessCompanyType = (companyType: string) => {
    const updatedProcess: Partial<VerificationProcess> = {
      ...editingProcess,
      companyTypeId: parseInt(companyType),
    };
    dispatch(verificationProcessManagementActions.updateProcess(updatedProcess));
  };

  const currentType = _.find(companyTypes, (type) => type.id === company?.companyTypeId);
  
  const groupedCriteria = _.groupBy(verificationCriterias, (editingCriteria) => {
    const found = _.find(criterias, criteria => criteria.id === editingCriteria.criteriaId);
    return found?.criteriaTypeId;
  });
  
  return (
    <div>
      <Helmet>
        <title>Hoàn thành đánh giá doanh nghiệp</title>
      </Helmet>
      <LoadingOverlay visible={loading} />
      <Title order={1}>Hoàn thành đánh giá doanh nghiệp</Title>
      <Button
        style={{ marginTop: '12px' }}
        component={Link}
        leftIcon={<ChevronLeftIcon />}
        to="/qua-trinh-danh-gia/xac-nhan"
      >
        Quay lại
      </Button>

      <Title style={{ marginTop: '24px' }} order={2}>
        Đợt đánh giá ngày {dayjs(editingProcess?.createdAt).format('DD/MM/YYYY')}
      </Title>

      <div style={{ marginTop: '24px' }}>
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
        <Title order={3} style={{ marginBottom: '12px' }}>Tài liệu</Title>
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
                      <VerifyCompleteCriteriaGroup
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

      {
        editingRequirement && (
          <div style={{ marginTop: '24px' }}>
            <Title order={3} style={{ marginBottom: '12px' }}>Kết quả xác minh</Title>
            {
              !!editingRequirement?.confirmedAt ? (
                <div>
                  <Text>
                    Kết quả xác minh:&nbsp;
                    {_.get(_.find(companyTypes, (type) => type.id === editingRequirement.confirmCompanyTypeId), 'typeName')}
                  </Text>
                  <div>
                    Văn bản xác thực:
                    <div>
                      {editingRequirement?.isUsingConfirmFile ? (
                        <FileInfo
                          data={{
                            name: editingRequirement?.confirmDocumentName ?? '',
                            type: editingRequirement?.confirmDocumentType ?? '',
                            size: editingRequirement?.confirmDocumentSize ?? 0,
                            url: editingRequirement?.confirmDocumentUrl ?? '',
                          }}
                        />
                      ) : (
                        <Paper dangerouslySetInnerHTML={{ __html: editingRequirement?.confirmDocumentContent ?? '' }} />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Text>Chưa có kết quả</Text>
              )
            }
          </div>
        )
      }

      <div style={{ marginTop: '24px' }}>
        <Title order={3} style={{ marginBottom: '12px' }}>Phân loại</Title>
        <Select
          style={{ width: '240px' }}
          onChange={changeProcessCompanyType}
          value={editingProcess?.companyTypeId?.toString()}
          placeholder="Chọn loại doanh nghiệp"
          data={_.map(companyTypes, (type) => ({
            value: type.id.toString(),
            label: type.typeName,
          }))}
        />
        <Group style={{ marginTop: '12px' }}>
          {
            editingRequirement ? (
              <Tooltip label="Đã yêu cầu cán bộ xác minh">
                <Button disabled>
                  Yêu cầu cán bộ xác minh
                </Button>
              </Tooltip>
            ) : (
              <Button onClick={() => setShowConfirmRequireModal(true)}>
                Yêu cầu cán bộ xác minh
              </Button>
            )
          }
          <Button onClick={() => setShowSubmitModal(true)}>
            Hoàn thành
          </Button>
        </Group>
      </div>

      <ConfirmRequireModal
        isOpening={showConfirmRequireModal}
        setIsOpening={setShowConfirmRequireModal}
      />

      <Modal
        opened={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Xác nhận lưu kết quả phân loại"
      >
        <Text style={{ marginBottom: '24px' }}>
          Vui lòng kiểm tra kết quả đánh giá trước khi công bố. Sau khi lưu kết quả, thông tin đánh giá sẽ được
          công bố cho doanh nghiệp.
        </Text>
        <Group>
          <Button onClick={submitComplete}>Xác nhận</Button>
          <Button variant="light" onClick={() => setShowSubmitModal(false)}>Hủy</Button>
        </Group>
      </Modal>
    </div>
  );
};

export default VerifyCompleteDetail;
