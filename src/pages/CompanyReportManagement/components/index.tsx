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
        <Link to={`/verification-request/${row.id}`} className="btn btn-default">Xem chi tiết</Link>
      ),
    },
  ];

  return (
    <div className="x_panel">
      <Helmet>
        <title>Yêu cầu đánh giá đánh giá trước thời hạn</title>
      </Helmet>
      <div className="x_title">
        <h2>Yêu cầu đánh giá đánh giá trước thời hạn</h2>
        <div className="clearfix"></div>
      </div>
      <div className="x_content">
        <div className="clearfix"></div>
        <div className="col-xs-12 table">
          <DataTable
            noHeader
            striped
            highlightOnHover
            columns={columns}
            data={companyReports}
            noDataComponent="Không có yêu cầu"
          />
        </div>
      </div>
      <CompanyReportModal
        isOpening={showModal}
      />
    </div>
  );
};

export default CompanyReportManagement;
