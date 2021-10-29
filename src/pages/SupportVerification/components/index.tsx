import dayjs from "dayjs";
import _ from "lodash";
import { useEffect } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationProcessActions from "../../../common/actions/verificationProcess.action";
import { VerificationProcess } from "../../../types/models";

type Props = {

};

const SupportVerificationList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, records } = useAppSelector((state) => state.verificationProcess);

  useEffect(() => {
    dispatch(verificationProcessActions.getAllSupport());
  }, [dispatch]);

  const columns: IDataTableColumn<VerificationProcess>[] = [
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
      selector: 'status',
    },
    {
      name: 'Hành động',
      cell: (row, index) => (
        <Link className="btn btn-default" to={`/support-verification/${row.id}`}>Xem chi tiết</Link>
      ),
    },
  ];

  return (
    <div className="x_panel">
      <div className="x_title">
        <h2>Hỗ trợ đánh giá cho doanh nghiệp</h2>
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

export default SupportVerificationList;
