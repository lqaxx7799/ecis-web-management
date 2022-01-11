import _ from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Modal from "react-responsive-modal";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import agentActions from "../../../../common/actions/agent.action";
import verificationProcessManagementActions from "../../action";
import CriteriaListTab from "./CriteriaListTab";

type Props = {

};

type RouteParams = {
  id: string;
};

const VerifyPendingProcessDetail = (props: Props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    editingProcess,
    verificationCriterias,
    loading,
  } = useAppSelector((state) => state.verificationProcessManagement);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);
  const { agents } = useAppSelector((state) => state.agent);

  const [selectedTabId, setSelectedTabId] = useState(-1);
  const [openingSubmitModal, setOpeningSubmitModal] = useState(false);
  const [assignedAgentId, setAssignedAgentId] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [approveAllSubmiting, setApproveAllSubmiting] = useState(false);

  let { id } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(agentActions.getAllAgents());
    dispatch(verificationProcessManagementActions.loadSelfVerification(parseInt(id)))
      .then(() => {
        setSelectedTabId(_.get(criteriaTypes, '0.id'));
      });
  }, [dispatch, id]);

  const approveAllCriterias = () => {
    setApproveAllSubmiting(true);
    dispatch(verificationProcessManagementActions.approveAllCriterias(parseInt(id)))
      .then(() => {
        setApproveAllSubmiting(false);
        toast.success('Lưu đánh giá thành công.');
      })
      .catch(() => {
        setApproveAllSubmiting(false);
        toast.error('Đã xảy ra lỗi trong quá trình lưu đánh giá. Vui lòng thử lại sau.');
      });
  };

  const submitVerify = () => {
    if (!assignedAgentId || assignedAgentId === '-') {
      return;
    }
    setSubmitting(true);
    dispatch(verificationProcessManagementActions.submitVerifyReview(parseInt(id), parseInt(assignedAgentId)))
      .then(() => {
        setSubmitting(false);
        history.push('/verification');
        toast.success('Lưu đánh giá thành công.');
      })
      .catch(() => {
        setSubmitting(false);
        toast.error('Đã xảy ra lỗi trong quá trình lưu đánh giá. Vui lòng thử lại sau.');
      });
  };

  const canSubmit = _(verificationCriterias)
    .filter((criteria) => criteria.approvedStatus === 'PENDING')
    .isEmpty();

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
          <Link
            className="btn btn-default"
            to={`/verify-verification-assign?companyId=${editingProcess?.companyId}`}
          >
            Yêu cầu xác minh
          </Link>
          <button
            className="btn btn-default"
            onClick={approveAllCriterias}
            disabled={approveAllSubmiting}
          >
            Đánh dấu tất cả đạt
          </button>
          {
            canSubmit ? (
              <button
                className="btn btn-primary"
                onClick={() => setOpeningSubmitModal(true)}
              >
                Duyệt kết quả
              </button>
            ) : (
              <Popup
                on={['hover']}
                position="top center"
                trigger={(
                  <span>
                    <button className="btn btn-primary" disabled>
                      Duyệt kết quả
                    </button>
                  </span>
                )}
              >
                Vui lòng đánh giá đầy đủ tiêu chí trước khi duyệt kết quả
              </Popup>
            )
          }
        </div>
      </div>
    </>
  );

  return (
    <div className="x_panel">
      <Helmet>
        <title>{`Đánh giá sự tuân thủ của doanh nghiệp ${editingProcess?.company.companyNameVI}`}</title>
      </Helmet>
      <div className="x_title">
        <h2>Đánh giá sự tuân thủ của doanh nghiệp {editingProcess?.company.companyNameVI}</h2>
        <div className="clearfix" />
      </div>
      <div className="x_breadcrumb">
        <Link className="btn btn-default" to="/verification">Quay lại</Link>
      </div>
      <div className="x_content">
        {
          loading ? (<div>Đang tải...</div>) : mainBody
        }
      </div>
      <Modal
        styles={{ modal: { width: '400px' } }}
        open={openingSubmitModal}
        onClose={() => setOpeningSubmitModal(false)}
      >
        <div>
          <h3>Xác nhận gửi đánh giá</h3>
        </div>
        <div>
          Kiểm tra đầy đủ nội dung đánh giá và chỉ định cán bộ phân loại kết quả đánh giá
        </div>
        <div style={{ marginTop: '12px' }}>
          <select
            placeholder="Chọn cán bộ"
            className="form-control"
            value={assignedAgentId}
            onChange={(e) => setAssignedAgentId(e.target.value)}
          >
            <option value={undefined}>-</option>
            {
              _.map(agents, (agent) => (
                <option value={agent.id} key={agent.id}>{agent.lastName} {agent.firstName}</option>
              ))
            }
          </select>
        </div>
        <div style={{ marginTop: '12px' }}>
          <button
            className="btn btn-primary"
            onClick={submitVerify}
            disabled={submitting}
          >
            Xác nhận
          </button>
          <button
            className="btn btn-default"
            onClick={() => setOpeningSubmitModal(false)}
          >
            Hủy
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default VerifyPendingProcessDetail;
