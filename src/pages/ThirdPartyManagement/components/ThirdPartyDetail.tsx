import _ from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import thirdPartyActions from "../../../common/actions/thirdParty.action";

type Props = {

};

type RouteParams = {
  id: string;
};

const ThirdPartyDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id: thirdPartyId } = useParams<RouteParams>();
  const { loading, editingThirdParty } = useAppSelector((state) => state.thirdParty);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const thirdPartyIdInt = parseInt(thirdPartyId);
    dispatch(thirdPartyActions.getById(thirdPartyIdInt));
  }, [dispatch, thirdPartyId]);

  const deactivate = () => {
    setSubmitting(true);
    dispatch(thirdPartyActions.deactivate(parseInt(thirdPartyId)))
      .then(() => {
        setSubmitting(false);
        toast.success('Tạm dừng thành công.');
      })
      .catch(() => {
        setSubmitting(false);
        toast.error('Đã xảy ra lỗi trong quá trình tạm dừng. Vui lòng thử lại sau.');
      });
  };

  const activate = () => {
    setSubmitting(true);
    dispatch(thirdPartyActions.activate(parseInt(thirdPartyId)))
      .then(() => {
        setSubmitting(false);
        toast.success('Kích hoạt thành công.');
      })
      .catch(() => {
        setSubmitting(false);
        toast.error('Đã xảy ra lỗi trong quá trình kích hoạt. Vui lòng thử lại sau.');
      });
  };

  const mainBody = (
    <div className="col-xs-12 table">
      <h3>Thông tin bên thụ hưởng</h3>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th style={{ width: '300px' }}>Tên người dùng</th>
            <td>{editingThirdParty?.userName ?? ''}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{editingThirdParty?.account?.email ?? '-'}</td>
          </tr>
          <tr>
            <th>Trạng thái</th>
            <td>{editingThirdParty?.isActive ? 'Đang hoạt động' : 'Tạm dừng'}</td>
          </tr>
        </tbody>
      </table>
      <h3>Hành động</h3>
      <div>
        {
          editingThirdParty?.isActive ? (
            <button
              className="btn btn-danger"
              disabled={submitting}
              onClick={deactivate}
            >
              Tạm dừng
            </button>
          ) : (
            <button
              className="btn btn-primary"
              disabled={submitting}
              onClick={activate}
            >
              Kích hoạt
            </button>
          )
        }
      </div>
    </div>
  );

  return (
    <div className="x_panel">
      <Helmet>
        <title>Quản lý bên thụ hưởng</title>
      </Helmet>
      <div className="x_title">
        <h2>Quản lý bên thụ hưởng</h2>
        <div className="clearfix"></div>
      </div>
      <div className="x_breadcrumb">
        <Link className="btn btn-default" to="/third-party">Quay lại</Link>
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

export default ThirdPartyDetail;
