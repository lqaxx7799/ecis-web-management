import _ from "lodash";
import { useEffect } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import verificationProcessActions from "../../../../common/actions/verificationProcess.action";
import { VerificationProcess } from "../../../../types/models";

type Props = {

};

const ClassifyVerification = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, records } = useAppSelector((state) => state.verificationProcess);

  useEffect(() => {
    dispatch(verificationProcessActions.getAllReviewed());
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
