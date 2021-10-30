import _ from "lodash";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationDocumentActions from "../../../common/actions/verificationDocument.action";
import fileServices from "../../../common/services/file.services";
import config from "../../../config";
import { CriteriaDetail, VerificationCriteria } from "../../../types/models";
import verificationProcessManagementActions from "../../VerificationProcessManagement/action";

type Props = {
  data: CriteriaDetail;
};

const CriteriaForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    verificationCriterias,
    verificationDocuments,
  } = useAppSelector((state) => state.verificationProcessManagement);
  
  const currentCriteria = _.find(verificationCriterias, (item) => item.criteriaDetailId === props.data.id);
  const currentDocuments = _.filter(verificationDocuments, (item) => item.verificationCriteriaId === currentCriteria?.id);
  const [opinion, setOpinion] = useState(currentCriteria?.companyOpinion ?? '');

  const updateCompanyRate = (rate: boolean) => {
    const updated: Partial<VerificationCriteria> = {
      ...currentCriteria,
      companyRate: rate,
    };
    dispatch(verificationProcessManagementActions.updateVerificationCriteria(updated));
  };

  const updateCompanyOpinion = () => {
    const updated: Partial<VerificationCriteria> = {
      ...currentCriteria,
      companyOpinion: opinion,
    };
    dispatch(verificationProcessManagementActions.updateVerificationCriteria(updated));
  };

  const handleUploadedFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      Promise.all(Array.from(files).map((file) =>
        fileServices.uploadFile(file)
          .then((fileRes) => {
            return dispatch(verificationProcessManagementActions.createDocument({
              resourceSize: fileRes.size,
              resourceType: fileRes.type,
              documentName: fileRes.name,
              resourceUrl: fileRes.url,
              verificationCriteriaId: currentCriteria?.id,
              uploaderType: 'BY_COMPANY',
            }));
          })
      ))
        .then((result) => {
          toast.success('Tải tài liệu thành công.');
        })
        .catch(() => {
          toast.error('Đã xảy ra lỗi trong quá trình tải tài liệu. Vui lòng thử lại sau.');
        });
    }
  };

  if (!currentCriteria) {
    return null;
  }

  return (
    <div>
      <div className="inline-radio-group">
        <label>Có</label>
        <input
          onClick={() => updateCompanyRate(true)}
          type="radio"
          checked={currentCriteria.companyRate}
        />
        <label>Không</label>
        <input
          onClick={() => updateCompanyRate(false)}
          type="radio"
          checked={currentCriteria.companyRate === false}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div>
          <label>Ý kiến riêng</label>
        </div>
        <textarea
          placeholder="Ý kiến riêng"
          rows={3}
          cols={50}
          value={opinion}
          onChange={(e) => setOpinion(e.target.value)}
        />
        <button onClick={updateCompanyOpinion} style={{ marginTop: '8px' }}>
          Lưu ý kiến
        </button>
      </div>
      <div style={{ marginTop: '8px' }}>
        <div>
          <label>File đính kèm</label>
        </div>
        <div>
          {
            _.map(currentDocuments, (item) => (
              <a
                key={item.id}
                target="_blank"
                rel="noopener noreferrer"
                href={`${config.BASE_API}${item.resourceUrl}`}
              >
                {item.documentName}
              </a>
            ))
          }
        </div>
        <button onClick={() => fileRef.current?.click()} style={{ marginTop: '4px' }}>Chọn file</button>
        <input style={{ display: 'none' }} ref={fileRef} type="file" onChange={handleUploadedFiles} multiple />
      </div>
    </div>
  );
};

export default CriteriaForm;
