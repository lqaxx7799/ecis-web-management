import _ from "lodash";
import { useState } from "react";
import { useAppSelector } from "../../../app/store";
import DetailVerificationCriteriaListTab from "./DetailVerificationCriteriaListTab";

type Props = {

};

const DetailVerification = (props: Props) => {
  const {
    loading,
  } = useAppSelector((state) => state.verificationProcessManagement);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);

  const [selectedTabId, setSelectedTabId] = useState(-1);

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
              <DetailVerificationCriteriaListTab
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
    <div>
      {
        loading ? (<div>Đang tải...</div>)
          : mainBody
      }
    </div>
  );
};

export default DetailVerification;
