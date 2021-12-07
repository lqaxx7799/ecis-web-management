import { FileIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyTypeActions from "../../../common/actions/companyType.action";
import violationReportActions from "../../../common/actions/violationReport.action";
import config from "../../../config";

type Props = {
  isOpening: boolean;
};

const ViolationReportModal = (props: Props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { editingViolationReport, violationReportDocuments } = useAppSelector((state) => state.violationReport);
  const { companyTypes } = useAppSelector((state) => state.companyType);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(companyTypeActions.getAll());
  }, [dispatch]);

  const closeModal = () => {
    history.push('/violation-report');    
  };

  const approveReport = () => {
    setSubmitting(true);
    dispatch(violationReportActions.approve(editingViolationReport?.id ?? 0))
      .then(() => {
        setSubmitting(false);
        toast.success('Xác nhận doanh nghiệp vi phạm thành công.');
        closeModal();
      })
      .catch(() => {
        setSubmitting(false);
        toast.error( 'Đã có lỗi xảy ra trong quá trình xác nhận vi phạm. Vui lòng thử lại sau.');
      });
  };

  const rejectReport = () => {
    setSubmitting(true);
    dispatch(violationReportActions.reject(editingViolationReport?.id ?? 0))
      .then(() => {
        setSubmitting(false);
        toast.success('Từ chối doanh nghiệp vi phạm thành công.');
        closeModal();
      })
      .catch(() => {
        setSubmitting(false);
        toast.success( 'Đã có lỗi xảy ra trong quá trình từ chối vi phạm. Vui lòng thử lại sau.');
      });
  };

  const currentType = _.find(companyTypes, (type) => type.id === editingViolationReport?.company?.companyTypeId);

  return (
    <Modal
      open={props.isOpening}
      onClose={closeModal}
      styles={{ modal: { width: "800px" } }}
    >
      <div style={{ marginTop: '24px' }}>
        <h2 style={{ marginBottom: '12px' }}>Thông tin doanh nghiệp</h2>
        <table className="table striped">
          <tbody>
            <tr>
              <td style={{ width: '300px' }}>Tên doanh nghiệp (Tiếng Việt)</td>
              <td>{editingViolationReport?.company?.companyNameVI}</td>
            </tr>
            <tr>
              <td>Tên doanh nghiệp (Tiếng Anh)</td>
              <td>{editingViolationReport?.company?.companyNameEN ?? '-'}</td>
            </tr>
            <tr>
              <td>Mã doanh nghiệp</td>
              <td>{editingViolationReport?.company?.companyCode}</td>
            </tr>
            <tr>
              <td>Loại hiện tại</td>
              <td>{currentType?.typeName ?? 'Chưa đánh giá'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "24px" }}>
        <h3>Nội dung vi phạm</h3>
        <p>{editingViolationReport?.description}</p>
      </div>
      <div style={{ marginTop: '24px' }}>
        <h3>Tài liệu vi phạm</h3>
        {_.isEmpty(violationReportDocuments) ? (
          <div>Không có tài liệu</div>
        ) : (
          _.map(violationReportDocuments, (document) => (
            <a
              className="file-item"
              key={document.id}
              target="_blank"
              rel="noopener noreferrer"
              href={`${config.BASE_API}${document.documentUrl}`}
            >
              <FileIcon /> {document.documentName}
            </a>
          ))
        )}
      </div>
      <div style={{ marginTop: "24px" }}>
        <h3>Trạng thái</h3>
        <span>
          {editingViolationReport?.status === "PENDING"
            ? "Đang chờ xử lý"
            : editingViolationReport?.status === "APPROVED"
            ? "Đã duyệt"
            : "Đã từ chối"}
        </span>
      </div>
      <div style={{ marginTop: '24px' }}>
        <button
          disabled={editingViolationReport?.status !== 'PENDING' || submitting}
          onClick={approveReport}
          className="btn btn-primary"
        >
          Xác nhận
        </button>
        <button
          onClick={rejectReport}
          className="btn btn-danger"
          disabled={editingViolationReport?.status !== 'PENDING' || submitting}
        >
          Từ chối
        </button>
        <button className="btn btn-default" onClick={closeModal}>
          Hủy
        </button>
      </div>
    </Modal>
  );
};

export default ViolationReportModal;
