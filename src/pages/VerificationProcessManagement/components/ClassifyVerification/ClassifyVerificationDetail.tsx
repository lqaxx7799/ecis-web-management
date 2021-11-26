import _ from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Modal from "react-responsive-modal";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
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
    loading,
  } = useAppSelector((state) => state.verificationProcessManagement);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);
  const { companyTypes } = useAppSelector((state) => state.companyType);

  const [selectedTabId, setSelectedTabId] = useState(-1);
  const [openingSubmitModal, setOpeningSubmitModal] = useState(false);
  const [companyTypeId, setCompanyTypeId] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  let { id } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(verificationProcessManagementActions.loadSelfVerification(parseInt(id)))
      .then(() => {
        setSelectedTabId(_.get(criteriaTypes, '0.id'));
      });
  }, [dispatch, id]);

  const submitClassify = () => {
    if (!companyTypeId || companyTypeId === '-') {
      return;
    }
    setSubmitting(true);
    dispatch(verificationProcessManagementActions.submitClassify(parseInt(id), parseInt(companyTypeId)))
      .then(() => {
        setSubmitting(false);
        history.push('/verification-classify');
        toast.success('Gửi phân loại thành công.');
      })
      .catch(() => {
        setSubmitting(false);
        toast.error('Đã xảy ra lỗi trong quá trình gửi phân loại. Vui lòng thử lại sau.');
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
          <label>Phân loại doanh nghiệp</label>
          <select
            placeholder="Chọn loại doanh nghiệp"
            className="form-control"
            value={companyTypeId}
            onChange={(e) => setCompanyTypeId(e.target.value)}
            style={{ marginBottom: '12px' }}
          >
            <option value={undefined}>-</option>
            {
              _.map(companyTypes, (companyType) => (
                <option value={companyType.id} key={companyType.id}>{companyType.typeName}</option>
              ))
            }
          </select>
          {
            !companyTypeId ? (
              <Popup
                trigger={<span><button className="btn btn-primary" disabled>Phân loại</button></span>}
                on={['hover']}
                position="top center"
              >
                Vui lòng chọn phân loại
              </Popup>
            ) : (
              <button className="btn btn-primary" onClick={() => setOpeningSubmitModal(true)}>Phân loại</button>
            )
          }
        </div>
      </div>
    </>
  );

  return (
    <div className="x_panel">
      <Helmet>
        <title>{`Phân loại đánh giá của công ty ${editingProcess?.company.companyNameVI}`}</title>
      </Helmet>
      <div className="x_title">
        <h2>Phân loại đánh giá của công ty {editingProcess?.company.companyNameVI}</h2>
        <div className="clearfix" />
      </div>
      <div className="x_breadcrumb">
        <Link className="btn btn-default" to="/verification-classify">Quay lại</Link>
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
          Sau khi gửi kết quả phân loại, FPD sẽ duyệt kết quả và công bó cho doanh nghiệp.
        </div>
        <div style={{ marginTop: '12px' }}>
          <button
            className="btn btn-primary"
            onClick={submitClassify}
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
