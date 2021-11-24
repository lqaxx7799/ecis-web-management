import dayjs from "dayjs";
import _ from "lodash";
import { useEffect } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationProcessActions from "../../../common/actions/verificationProcess.action";
import { VerificationProcess } from "../../../types/models";

import '../verificationProcessManagement.scss';

type Props = {

};

const VerificationProcessManagement = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, records } = useAppSelector((state) => state.verificationProcess);

  useEffect(() => {
    dispatch(verificationProcessActions.getAllPending());
  }, []);

  const columns: IDataTableColumn<VerificationProcess>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
      width: '50px',
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
      name: 'Hạn đánh giá',
      selector: 'submitDeadline',
      format: (row) => dayjs(row.submitDeadline).format('DD/MM/YYYY'),
    },
    {
      name: 'Hành động',
      cell: (row, index) => (
        <Link className="btn btn-default" to={`/verification/${row.id}`}>Đánh giá</Link>
      ),
    },
  ];

  return (
    <div className="x_panel">
      <Helmet>
        <title>Danh sách yêu cầu đánh giá</title>
      </Helmet>
      <div className="x_title">
        <h2>Danh sách yêu cầu đánh giá</h2>
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
            data={records}
            noDataComponent="Không có yêu cầu"
          />
        </div>
      </div>
    </div>
  );
};

export default VerificationProcessManagement;
