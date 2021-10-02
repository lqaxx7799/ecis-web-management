import { Button, Group, LoadingOverlay, Menu, Modal, Text, Title, Tooltip } from "@mantine/core";
import { CheckIcon, EyeOpenIcon, PersonIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationConfirmRequirementActions from "../../../common/actions/verificationConfirmRequirement.action";
import FileInfo from "../../../common/components/FileInfo";
import { DEFAULT_DATETIME_FORMAT } from "../../../common/constants/app";
import { VerificationConfirmRequirementActionTypes } from "../../../common/reducers/verificationConfirmRequirement.reducer";
import { VerificationConfirmUpdateDTO } from "../../../types/dto";
import { VerificationConfirmRequirement } from "../../../types/models";
import ConfirmAnnounceCompanyModal from "./ConfirmAnnounceCompanyModal";
import ReportConfirmModal from "./ReportConfirmModal";

type Props = {

};


const AssignedVerificationConfirmList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { agent } = useAppSelector((state) => state.authentication);
  const { verificationConfirmRequirements, loading } = useAppSelector((state) => state.verificationConfirmRequirement);

  const [announceCompanyShowing, setAnnounceCompanyShowing] = useState(false);

  const [announceDocumentModalShowing, setAnnounceDocumentModalShowing] = useState(false);
  const [reportModalShowing, setReportModalShowing] = useState(false);
  const [announceDocument, setAnnounceDocument] = useState<Partial<VerificationConfirmUpdateDTO> | undefined>(undefined);

  useEffect(() => {
    dispatch(verificationConfirmRequirementActions.getAssigned(agent?.id ?? 0));
  }, []);

  const viewAnnounce = (confirmId: number) => {
    const currentConfirm = _.find(verificationConfirmRequirements, (item) => item.id === confirmId);
    if (currentConfirm) {
      setAnnounceDocumentModalShowing(true);
      setAnnounceDocument({
        isUsingFile: currentConfirm.isUsingAnnounceAgentFile,
        documentContent: currentConfirm.announceAgentDocumentContent,
        documentType: currentConfirm.announceAgentDocumentType,
        documentSize: currentConfirm.announceAgentDocumentSize,
        documentUrl: currentConfirm.announceAgentDocumentUrl,
        documentName: currentConfirm.announceAgentDocumentName,
      });
    }
  };

  const closeAnnounceDocumentModal = () => {
    setAnnounceDocumentModalShowing(false);
    setAnnounceDocument(undefined);
  };

  const announceCompany = (confirmId: number) => {
    dispatch(verificationConfirmRequirementActions.getById(confirmId))
      .then(() => {
        setAnnounceCompanyShowing(true);
      });
  };

  const closeModal = () => {
    dispatch<VerificationConfirmRequirementActionTypes>({
      type: 'VERIFICATION_CONFIRM_REQUIREMENT_EDITING_LOADED',
      payload: undefined,
    });
    setAnnounceCompanyShowing(false);
  };

  const viewReportResult = (confirmId: number) => {
    dispatch(verificationConfirmRequirementActions.getById(confirmId))
      .then(() => {
        setReportModalShowing(true);
      });
  };

  const closeReportModal = () => {
    dispatch<VerificationConfirmRequirementActionTypes>({
      type: 'VERIFICATION_CONFIRM_REQUIREMENT_EDITING_LOADED',
      payload: undefined,
    });
    setReportModalShowing(false);
  };

  const columns: IDataTableColumn<VerificationConfirmRequirement>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Công ty',
      selector: (row) => `${_.get(row, 'verificationProcess.company.companyNameVI')} (${_.get(row, 'verificationProcess.company.companyCode')})`,
    },
    {
      name: 'Thời gian hẹn',
      selector: (row) =>  dayjs(row.scheduledTime).format(DEFAULT_DATETIME_FORMAT),
    },
    {
      name: 'Địa điểm hẹn',
      selector: 'scheduledLocation',
    },
    {
      name: 'Thời gian tạo',
      selector: 'createdAt',
      format: (row) => dayjs(row.createdAt).format('DD/MM/YYYY'),
    },
    {
      name: 'Trạng thái',
      selector: (row) =>
        !!row.confirmedAt ? "Đã đánh giá" :
        !!row.announcedCompanyAt ? "Đã thông báo doanh nghiệp" :
        "Chưa thông báo doanh nghiệp",
    },
    {
      name: 'Hành động',
      cell: (row, index) => (
        <Menu>
          <Menu.Item
            icon={<PersonIcon />}
            onClick={() => announceCompany(row.id)}  
          >
            Thông báo doanh nghiệp
          </Menu.Item>
          <Menu.Item
            icon={<EyeOpenIcon />}
            onClick={() => viewAnnounce(row.id)}
          >
            Xem văn bản thông báo
          </Menu.Item>
          <Menu.Item
            icon={<CheckIcon />}
            disabled={!!row.confirmedAt}
            onClick={() => viewReportResult(row.id)}
          >
            Báo cáo kết quả
          </Menu.Item>
        </Menu>
      ),
    },
  ];

  return (
    <div>
      <Title order={1}>Yêu cầu xác thực doanh nghiệp</Title>

      <div style={{ marginTop: '24px' }}>
      <LoadingOverlay visible={loading} />

      <DataTable
        title={<Title order={2}>Danh sách yêu cầu</Title>}
        columns={columns}
        data={verificationConfirmRequirements}
        noDataComponent={<Text>Không có dữ liệu</Text>}
      />
      </div>

      <ConfirmAnnounceCompanyModal
        isOpening={announceCompanyShowing}
        onClose={closeModal}
      />

      <ReportConfirmModal
        isOpening={reportModalShowing}
        onClose={closeReportModal}
      />

      <Modal
        opened={announceDocumentModalShowing}
        onClose={closeAnnounceDocumentModal}
        title="Văn bản thông báo"
        size="md"
      >
        {
          announceDocument?.isUsingFile ? (
            <FileInfo
              data={{
                name: announceDocument.documentName ?? '',
                size: announceDocument.documentSize ?? 0,
                type: announceDocument.documentType ?? '',
                url: announceDocument.documentUrl ?? '',
              }}
            />
          ) : (
            <p dangerouslySetInnerHTML={{ __html: announceDocument?.documentContent ?? '' }} />
          )
        }
      </Modal>
    </div>
  );
};

export default AssignedVerificationConfirmList;
