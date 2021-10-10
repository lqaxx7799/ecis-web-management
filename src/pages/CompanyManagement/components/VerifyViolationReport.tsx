import { Anchor, Breadcrumbs, Button, Group, LoadingOverlay, Title, Tooltip } from "@mantine/core";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import violationReportActions from "../../../common/actions/violationReport.action";
import { ViolationReport } from "../../../types/models";

type Props = {

};

const VerifyViolationReport = (props: Props) => {
  const dispatch = useAppDispatch();

  const { loading, violationReports } = useAppSelector((state) => state.violationReport);

  useEffect(() => {
    dispatch(violationReportActions.getAll());
  }, [dispatch]);

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
      name: 'Hành động',
      cell: (row, index) => (
        <Group>
          <Tooltip label="Xem chi tiết">
            <Button><EyeOpenIcon /></Button>
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
    </div>
  );
};

export default VerifyViolationReport;
