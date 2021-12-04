import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationProcessActions from "../../../common/actions/verificationProcess.action";
import { VerificationProcessRatingDTO } from "../../../types/dto";
import { VerificationProcess } from "../../../types/models";

import '../verificationProcessManagement.scss';

type Props = {

};

const VerificationProcessManagement = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, records } = useAppSelector((state) => state.verificationProcess);
  const [ratings, setRatings] = useState<VerificationProcessRatingDTO[]>([]);

  useEffect(() => {
    dispatch(verificationProcessActions.getAllPending())
      .then(async (result) => {
        const processIds = _.map(result, 'id');
        const ratingResult = await dispatch(verificationProcessActions.getRatingCount(processIds));
        setRatings(ratingResult);
      });
  }, [dispatch]);

  const columns: IDataTableColumn<VerificationProcess>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Doanh nghiệp',
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
      name: 'Kết quả đánh giá',
      selector: (row) => {
        const rating = _.find(ratings, (item) => item.verificationProcessId === row.id);
        if (!rating) {
          return '';
        }
        return (
          <>
            <div>Đạt: {rating.verifiedCount}/{rating.totalCount}</div>
            <div>Không đạt: {rating.rejectedCount}/{rating.totalCount}</div>
          </>
        );
      },
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
