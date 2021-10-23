import { Button, Group, LoadingOverlay, Title, Tooltip } from '@mantine/core';
import { EyeOpenIcon, Pencil2Icon } from '@radix-ui/react-icons';
import dayjs from 'dayjs';
import _ from "lodash";
import { useEffect, useState } from 'react';
import DataTable, { IDataTableColumn } from "react-data-table-component";
import Helmet from "react-helmet";
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import companyReportActions from '../../../common/actions/companyReport.action';
import { CompanyReport } from '../../../types/models';
import CompanyReportModal from './CompanyReportModal';

type Props = {

};

type RouteParams = {
  id: string;
};

const CompanyReportManagement = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id: companyReportId } = useParams<RouteParams>();
  const { loading, companyReports } = useAppSelector((state) => state.companyReport);

  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    dispatch(companyReportActions.getAll());
  }, [dispatch]);

  useEffect(() => {
    if (companyReportId) {
      dispatch(companyReportActions.getById(parseInt(companyReportId)));
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [companyReportId, dispatch]);

  const columns: IDataTableColumn<CompanyReport>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Công ty',
      selector: (row) => `${_.get(row, 'targetedCompany.companyNameVI')} (${_.get(row, 'targetedCompany.companyCode')})`,
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
              to={`/xu-ly-yeu-cau/${row.id}`}
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
        <title>Quản lý doanh nghiệp</title>
      </Helmet>
      <Title order={1}>Quản lý doanh nghiệp</Title>

      <LoadingOverlay visible={loading} />

      <div style={{ marginTop: '24px' }}>
        <DataTable
          title={<Title order={2}>Danh sách doanh nghiệp</Title>}
          data={companyReports}
          columns={columns}
        />
      </div>

      <CompanyReportModal
        isOpening={showModal}
      />
    </div>
  );
};

export default CompanyReportManagement;
