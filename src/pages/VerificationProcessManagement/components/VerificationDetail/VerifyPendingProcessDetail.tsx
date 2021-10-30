import { useNotifications } from "@mantine/notifications";
import _ from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { VerificationProcess } from "../../../../types/models";
import verificationProcessManagementActions from "../../action";
import CriteriaListTab from "./CriteriaListTab";

type Props = {

};

type RouteParams = {
  id: string;
};

const VerifyPendingProcessDetail = (props: Props) => {
  // const notifications = useNotifications();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    editingProcess,
    loading,
  } = useAppSelector((state) => state.verificationProcessManagement);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);
  const { companyTypes } = useAppSelector((state) => state.companyType);

  const [selectedTabId, setSelectedTabId] = useState(-1);

  let { id } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(verificationProcessManagementActions.loadSelfVerification(parseInt(id)))
      .then(() => {
        setSelectedTabId(_.get(criteriaTypes, '0.id'));
      });
  }, [dispatch, id]);

  const editVerificationCompanyType = (e: ChangeEvent<HTMLSelectElement>) => {
    const updated: Partial<VerificationProcess> = {
      ...editingProcess,
      companyTypeId: e.target.value ? parseInt(e.target.value) : undefined,
    };
    dispatch(verificationProcessManagementActions.updateProcess(updated))
      .then(() => {
        toast.success('Lưu kết quả phân loại doanh nghiệp thành công.');
      })
      .catch(() => {
        toast.error('Đã xảy ra lỗi trong quá trình lưu kết quả phân loại doanh nghiệp. Vui lòng thử lại sau.');
      });
  };

  const submitVerify = () => {
    dispatch(verificationProcessManagementActions.submitVerifyReview(parseInt(id)))
      .then(() => {
        history.push('/verification');
        toast.success('Lưu đánh giá thành công.');
      })
      .catch(() => {
        toast.error('Đã xảy ra lỗi trong quá trình lưu đánh giá. Vui lòng thử lại sau.');
      });
  };

  const mainBody = (
    <>
      <div className="col-xs-3">
        <ul className="nav nav-tabs tabs-left">
          {
            _.map(criteriaTypes, (type) => (
              <li
                key={type.id}
                className={`nav-item ${type.id === selectedTabId ? 'active' : ''} `}
                onClick={() => setSelectedTabId(type.id)}
              >
                <a data-toggle="pill" data-target={`#${type.id}`}>
                  {type.criteriaTypeName}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="col-xs-9">
        <div className="tab-content">
          {
            _.map(criteriaTypes, (type) => (
              <CriteriaListTab
                criteriaTypeId={type.id}
                isSelected={selectedTabId === type.id}
              />
            ))
          }
        </div>
        <div style={{ marginTop: '24px' }}>
          <label>
            Phân loại doanh nghiệp
          </label>
          <select
            placeholder="Chọn phân loại"
            className="form-control"
            value={editingProcess?.companyTypeId}
            onChange={editVerificationCompanyType}
          >
            <option value={undefined}>-</option>
            {
              _.map(companyTypes, (type) => (
                <option value={type.id}>{type.typeName}</option>
              ))
            }
          </select>
        </div>
        <div style={{ marginTop: '24px' }}>
          <button className="btn btn-primary" onClick={submitVerify}>Duyệt kết quả</button>
        </div>
        <div style={{ marginTop: '24px' }}>
          <Link
            className="btn btn-default"
            to={`/verify-verification-assign?companyId=${editingProcess?.companyId}`}
          >
            Yêu cầu xác thực
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="x_panel">
      <div className="x_title">
        <h2>Đánh giá sự tuân thủ của công ty {editingProcess?.company.companyNameVI}</h2>
        <div className="clearfix" />
      </div>
      <div className="x_content">
        {
          loading ? (<div>Đang tải...</div>) : mainBody
        }
      </div>
    </div>
  );
};

export default VerifyPendingProcessDetail;
