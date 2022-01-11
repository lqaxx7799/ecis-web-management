import { FileIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationDocumentActions from "../../../common/actions/verificationDocument.action";
import fileServices from "../../../common/services/file.services";
import helpers from "../../../common/utils/helpers";
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

  const updateCompanyRate = (rate: boolean | null) => {
    const updated: Partial<VerificationCriteria> = {
      ...currentCriteria,
      companyRate: rate,
    };
    dispatch(verificationProcessManagementActions.updateVerificationCriteria(updated))
      .then(() => {
        toast.success('Cập nhật đánh giá thành công.');
      })
      .catch(() => {
        toast.error('Đã xảy ra lỗi trong quá trình cập nhật đánh giá. Vui lòng thử lại sau.');
      });
  };

  const updateCompanyOpinion = () => {
    const updated: Partial<VerificationCriteria> = {
      ...currentCriteria,
      companyOpinion: opinion,
    };
    dispatch(verificationProcessManagementActions.updateVerificationCriteria(updated))
      .then(() => {
        toast.success('Cập nhật đánh giá thành công.');
      })
      .catch(() => {
        toast.error('Đã xảy ra lỗi trong quá trình cập nhật đánh giá. Vui lòng thử lại sau.');
      });
  };

  const handleUploadedFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      const validation = helpers.validateUploadedFiles(files);
      if (validation) {
        toast.error(validation);
        return;
      }

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
        <div>
          <input
            onClick={() => updateCompanyRate(true)}
            type="radio"
            checked={currentCriteria.companyRate === true}
          />
          <label>Đáp ứng</label>
        </div>
        <div>
          <input
            onClick={() => updateCompanyRate(false)}
            type="radio"
            checked={props.data?.isRequired ? !currentCriteria.companyRate : currentCriteria.companyRate === false}
          />
          <label>Không đáp ứng</label>
        </div>
        {
          !props.data?.isRequired && (
            <div>
              <input
                onClick={() => updateCompanyRate(null)}
                type="radio"
                checked={currentCriteria.companyRate === null}
              />
              <label>Không phải loại hình của DN</label>
            </div>
          )
        }
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
                className="file-item"
                key={item.id}
                target="_blank"
                rel="noopener noreferrer"
                href={`${config.BASE_API}${item.resourceUrl}`}
              >
                <FileIcon /> {item.documentName}
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
