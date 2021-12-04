import _ from "lodash";
import { useEffect, useState } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import verificationProcessActions from "../../../../common/actions/verificationProcess.action";
import { VerificationProcessRatingDTO } from "../../../../types/dto";
import { VerificationProcess } from "../../../../types/models";

type Props = {

};

const ClassifyVerification = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, records } = useAppSelector((state) => state.verificationProcess);
  const [ratings, setRatings] = useState<VerificationProcessRatingDTO[]>([]);

  useEffect(() => {
    dispatch(verificationProcessActions.getAllReviewed())
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
    },
    {
      name: 'Doanh nghiệp',
      selector: (row) => `${_.get(row, 'company.companyNameVI')} (${_.get(row, 'company.companyCode')})`,
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
      name: 'Thao tác',
      selector: (row) => (
        <Link className="btn btn-default" to={`/verification-classify/${row.id}`}>Xem chi tiết</Link>
      ),
      wrap: true,
    },
  ];

  return (
    <div className="x_panel">
      <Helmet>
        <title>Phân loại đánh giá</title>
      </Helmet>
      <div className="x_title">
        <h2>Phân loại đánh giá</h2>
        <div className="clearfix" />
      </div>
      <div className="x_content">
        {
          loading ? (<div>Đang tải...</div>)
            : (
              <DataTable
                striped
                highlightOnHover
                noHeader
                columns={columns}
                data={records}
                noDataComponent="Không có dữ liệu"
              />
            )
        }
      </div>
    </div>
  );
};

export default ClassifyVerification;
