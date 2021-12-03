import dayjs from "dayjs";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyTypeModificationActions from "../../../common/actions/companyTypeModification.action";
import { MODIFICATION_TYPE } from "../../../common/constants/app";
import DetailVerification from "./DetailVerification";
import DetailViolation from "./DetailViolation";

type Props = {

};

type RouteParams = {
  id: string,
};

const ModificationResultDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { id: modificationId } = useParams<RouteParams>();

  const { loading, editingModification } = useAppSelector((state) => state.companyTypeModification);

  useEffect(() => {
    dispatch(companyTypeModificationActions.getById(parseInt(modificationId)));
  }, [dispatch, modificationId]);

  const backUrl = history.location.pathname.includes('/verification-result')
    ? '/verification-result'
    : `/company/${editingModification?.companyId}`;

  const mainBody = (
    <div>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Ngày hoàn thành</th>
            <td>{dayjs(editingModification?.createdAt).format('DD/MM/YYYY')}</td>
          </tr>
          <tr>
            <th>Loại</th>
            <td>{MODIFICATION_TYPE[editingModification?.modification ?? ''] ?? '-'}</td>
          </tr>
          <tr>
            <th>Kết quả phân loại</th>
            <td>
              Chuyển từ{' '}
              {editingModification?.previousCompanyType?.typeName ?? 'Chưa đánh giá'} sang{' '}
              {editingModification?.updatedCompanyType?.typeName ?? 'Chưa đánh giá'}
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '24px' }}>
        {
          editingModification?.modification === 'VERIFICATION' ? <DetailVerification />
            : editingModification?.modification === 'VIOLATION' ? <DetailViolation />
            : null
        }
      </div>
    </div>
  );

  return (
    <div className="x_panel">
      <Helmet>
        <title>Chi tiết quá trình đánh giá</title>
      </Helmet>
      <div className="x_title">
        <h2>Chi tiết quá trình đánh giá</h2>
        <div className="clearfix" />
      </div>
      <div className="x_breadcrumb">
        <Link className="btn btn-default" to={backUrl}>Quay lại</Link>
      </div>
      <div className="x_content">
        {
          loading ? (<div>Đang tải...</div>)
            : mainBody
        }
      </div>
    </div>
  );
};

export default ModificationResultDetail;
