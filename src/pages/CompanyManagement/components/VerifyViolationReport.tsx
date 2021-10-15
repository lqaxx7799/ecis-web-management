import { Anchor, Breadcrumbs, Button, Group, LoadingOverlay, Title, Tooltip } from "@mantine/core";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import violationReportActions from "../../../common/actions/violationReport.action";
import { ViolationReport } from "../../../types/models";
import ViolationReportModal from "./ViolationReportModal";

type Props = {

};

type RouteParams = {
  id: string;
};

const VerifyViolationReport = (props: Props) => {
  const dispatch = useAppDispatch();

  const { id: violationReportId } = useParams<RouteParams>();
  const { loading, violationReports } = useAppSelector((state) => state.violationReport);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(violationReportActions.getAll());
  }, [dispatch]);

  useEffect(() => {
    if (violationReportId) {
      dispatch(violationReportActions.getById(parseInt(violationReportId)));
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [violationReportId, dispatch]);

  const columns: IDataTableColumn<ViolationReport>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Công ty',
      selector: (row) => `${_.get(row, 'company.companyNameVI')} (${_.get(row, 'company.companyCode')})`,
    },
    {
      name: 'Thời gian tạo',
      selector: 'createdAt',
      format: (row) => dayjs(row.createdAt).format('DD/MM/YYYY'),
    },
    {
      name: 'Trạng thái',
      selector: (row) => row.status === 'PENDING' ? 'Đang chờ xử lý'
        : row.status === 'APPROVED' ? 'Đã duyệt'
        : 'Đã từ chối',
    },
    {
      name: 'Hành động',
      cell: (row, index) => (
        <Group>
          <Tooltip label="Xem chi tiết">
            <Button
              component={Link}
              to={`/doanh-nghiep/duyet-bao-cao/${row.id}`}
            >
              <EyeOpenIcon />
            </Button>
          </Tooltip>
        </Group>
      ),
    },
  ];
 
  return (
    <div>
      <Helmet>
        <title>Duyệt báo cáo vi phạm của doanh nghiệp</title>
      </Helmet>

      <Title order={1}>Duyệt báo cáo vi phạm của doanh nghiệp</Title>

      <LoadingOverlay visible={loading} />

      <div style={{ marginTop: '12px' }}>
        <Breadcrumbs>
          <Anchor component={Link} to="/">Trang chủ</Anchor>
          <Anchor component={Link} to="/doanh-nghiep">Quản lý doanh nghiệp</Anchor>
        </Breadcrumbs>
      </div>

      <div style={{ marginTop: '24px' }}>
        <DataTable
          title={<Title order={2}>Danh sách doanh nghiệp</Title>}
          data={violationReports}
          columns={columns}
        />
      </div>

      <ViolationReportModal
        isOpening={showModal}
      />
    </div>
  );
};

export default VerifyViolationReport;
