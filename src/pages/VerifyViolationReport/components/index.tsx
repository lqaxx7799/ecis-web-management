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
        <Link
          className="btn btn-default"
          to={`/violation-report/${row.id}`}
        >
          Xem chi tiết
        </Link>
      ),
    },
  ];

  return (
    <div className="x_panel">
      <Helmet>
        <title>Hoạt động sai phạm</title>
      </Helmet>
      <div className="x_title">
        <h2>Hoạt động sai phạm</h2>
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
            data={violationReports}
            noDataComponent="Không có báo cáo"
          />
        </div>
      </div>
      <ViolationReportModal
        isOpening={showModal}
      />
    </div>
  ); 
};

export default VerifyViolationReport;
