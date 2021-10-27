import { useNotifications } from "@mantine/notifications";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import verificationProcessManagementActions from "../../action";
import CriteriaListTab from "./CriteriaListTab";

type Props = {

};

type RouteParams = {
  id: string;
};

const VerifyPendingProcessDetail = (props: Props) => {
  const notifications = useNotifications();
  const dispatch = useAppDispatch();
  const {
    editingProcess,
    loading,
  } = useAppSelector((state) => state.verificationProcessManagement);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);

  const [selectedTabId, setSelectedTabId] = useState(-1);

  let { id } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(verificationProcessManagementActions.loadSelfVerification(parseInt(id)));
  }, [dispatch, id]);

  const submitVerify = () => {
    dispatch(verificationProcessManagementActions.submitVerifyReview(parseInt(id)))
      .then(() => {
        notifications.showNotification({
          color: 'green',
          title: 'Thành công',
          message: 'Lưu đánh giá thành công',
        });
      })
      .catch(() => {
        notifications.showNotification({
          color: 'red',
          title: 'Lỗi hệ thống',
          message: 'Đã có lỗi xảy ra trong quá trình lưu đánh giá doanh nghiệp',
        });
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
          <button onClick={submitVerify}>Gửi lên</button>
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
