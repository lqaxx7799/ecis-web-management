import _ from "lodash";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyActions from "../../../common/actions/company.action";
import verificationProcessActions from "../../../common/actions/verificationProcess.action";

type Props = {

};

type RouteParams = {
  id: string;
};

const CompanyDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id: companyId } = useParams<RouteParams>();
  const { loading, editingCompany } = useAppSelector((state) => state.company);
  const { records: verifications } = useAppSelector((state) => state.verificationProcess);

  useEffect(() => {
    dispatch(companyActions.getById(parseInt(companyId)));
    dispatch(verificationProcessActions.getAllByCompany(parseInt(companyId)));
  }, []);

  const pendingVerification = _.find(verifications, (verification) => !verification.isFinished);

  const generateVerification = () => {
    if (pendingVerification) {
      return;
    }
    dispatch(verificationProcessActions.generate(parseInt(companyId)))
      .then(() => {
        toast.success('Tạo yêu cầu đánh giá thành công.');
      })
      .catch(() => {
        toast.error('Đã xảy ra lỗi trong quá trình tạo yêu cầu đánh giá. Vui lòng thử lại sau.');
      });
  };

  const mainBody = (
    <div className="col-xs-12 table">
      <table className="table table-striped">
        <tbody>
          <tr>
            <th style={{ width: '300px' }}>Tên doanh nghiệp (Tiếng Việt)</th>
            <td>{editingCompany?.companyNameVI}</td>
          </tr>
          <tr>
            <th>Tên doanh nghiệp (Tiếng Anh)</th>
            <td>{editingCompany?.companyNameEN ?? '-'}</td>
          </tr>
          <tr>
            <th>Mã doanh nghiệp</th>
            <td>{editingCompany?.companyCode}</td>
          </tr>
          <tr>
            <th>Loại hiện tại</th>
            <td>{editingCompany?.companyType?.typeName ?? 'Chưa đánh giá'}</td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: '24px' }}>
        <button
          className="btn btn-primary"
          onClick={generateVerification}
          disabled={!!pendingVerification}
        >
          Yêu cầu đánh giá
        </button>
      </div>
    </div>
  );

  return (
    <div className="x_panel">
      <Helmet>
        <title>Quản lý doanh nghiệp</title>
      </Helmet>
      <div className="x_title">
        <h2>Quản lý doanh nghiệp</h2>
        <div className="clearfix"></div>
      </div>
      <div className="x_breadcrumb">
        <Link className="btn btn-default" to="/company">Quay lại</Link>
      </div>
      <div className="x_content">
        <div className="clearfix"></div>
        {
          loading ? (<div>Đang tải</div>) : mainBody
        }
      </div>
    </div>
  );
};

export default CompanyDetail;
