import _ from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationProcessManagementActions from "../../VerificationProcessManagement/action";
import CriteriaListTab from "./CriteriaListTab";

type Props = {

};

type RouteParams = {
  id: string;
};

const SupportVerificationDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    loading,
    editingProcess,
  } = useAppSelector((state) => state.verificationProcessManagement);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);

  const [selectedTabId, setSelectedTabId] = useState(-1);

  const { id: processId } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(verificationProcessManagementActions.loadSelfVerification(parseInt(processId)))
      .then(() => {
        setSelectedTabId(_.get(criteriaTypes, '0.id'));
      });
  }, [dispatch]);

  const noData = (
    <div>
      Hiện tại doanh nghiệp không cần phải đánh giá.
      Yêu cầu đánh giá tại đây.
    </div>
  );

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
      </div>
    </>
  );

  return (
    <div className="x_panel">
      <div className="x_title">
        <h2>Đánh giá cho công ty {editingProcess?.company.companyNameVI}</h2>
        <div className="clearfix" />
      </div>
      <div className="x_content">
        {
          loading ? (<div>Đang tải...</div>)
            : !editingProcess ? noData
            : mainBody
        }
      </div>
    </div>
  );
};

export default SupportVerificationDetail;
