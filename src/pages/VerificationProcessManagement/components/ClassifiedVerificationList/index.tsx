import dayjs from "dayjs";
import _ from "lodash";
import { useEffect } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import verificationProcessActions from "../../../../common/actions/verificationProcess.action";
import { VerificationProcess } from "../../../../types/models";
import verificationProcessManagementActions from "../../action";

type Props = {

};

const ClassifiedVerificationList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, records } = useAppSelector((state) => state.verificationProcess);
  const history = useHistory();

  useEffect(() => {
    dispatch(verificationProcessActions.getAllClassified());
  }, []);

  const completeVerification = (verificationId: number, value: boolean) => {
    if (value) {
      dispatch(verificationProcessManagementActions.finishVerify(verificationId))
        .then(() => {
          toast.success('Lưu kết quả thành công.');
        })
        .catch(() => {
          toast.success('Đã xảy ra lỗi trong quá trình lưu kết quả. Vui lòng thử lại sau.');
        });
    } else {
      dispatch(verificationProcessManagementActions.rejectClassified(verificationId))
        .then(() => {
          toast.success('Lưu kết quả thành công.');
        })
        .catch(() => {
          toast.success('Đã xảy ra lỗi trong quá trình lưu kết quả. Vui lòng thử lại sau.');
        });
    }
  };

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
      name: 'Kết quả phân loại',
      selector: (row) => _.get(row, 'companyType.typeName', 'Không có đánh giá'),
    },
    {
      name: 'Thao tác',
      selector: (row, index) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <a style={{ marginBottom: '4px' }} onClick={() => completeVerification(row.id, true)}>
            <i className="fa fa-check-square-o" aria-hidden="true" />Đồng ý
          </a>
          <a onClick={() => completeVerification(row.id, false)}>
            <i className="fa fa-times-circle" aria-hidden="true" />Không đồng ý
          </a>
        </div>
      ),
      wrap: true,
    },
  ];

  return (
    <div className="x_panel">
      <Helmet>
        <title>Duyệt kết quả phân loại</title>
      </Helmet>
      <div className="x_title">
        <h2>Duyệt kết quả phân loại</h2>
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

export default ClassifiedVerificationList;
