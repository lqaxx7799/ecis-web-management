import { FileIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { ChangeEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import verificationDocumentActions from "../../../../common/actions/verificationDocument.action";
import fileServices from "../../../../common/services/file.services";
import config from "../../../../config";
import { CriteriaDetail, VerificationCriteria } from "../../../../types/models";
import companySelfVerificationActions from "../../action";

type Props = {
  data: CriteriaDetail;
};

const CriteriaForm = (props: Props) => {
  const {
    verificationCriterias,
    verificationDocuments,
  } = useAppSelector((state) => state.verificationProcessManagement);
  
  const currentCriteria = _.find(verificationCriterias, (item) => item.criteriaDetailId === props.data.id);
  const currentDocuments = _.filter(verificationDocuments, (item) => item.verificationCriteriaId === currentCriteria?.id);

  if (!currentCriteria) {
    return null;
  }

  return (
    <div>
      <div className="inline-radio-group">
        <div>
          <input
            type="radio"
            checked={currentCriteria.companyRate === true}
          />
          <label>Có</label>
        </div>
        <div>
          <input
            type="radio"
            checked={props.data?.isRequired ? !currentCriteria.companyRate : currentCriteria.companyRate === false}
          />
          <label>Không</label>
        </div>
        {
          !props.data?.isRequired && (
            <div>
              <input
                type="radio"
                checked={currentCriteria.companyRate === null}
              />
              <label>Không phải loại hình của DN</label>
            </div>
          )
        }
      </div>
      {
        currentCriteria.companyOpinion && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div>
              <label>Ý kiến riêng</label>
            </div>
            <p>
              {currentCriteria.companyOpinion} 
            </p>
          </div>
        )
      }
      <div style={{ marginTop: '8px' }}>
        <div>
          <label>File đính kèm</label>
        </div>
        <div>
          {
            _.isEmpty(currentDocuments)
              ? 'Không có'
              : _.map(currentDocuments, (item) => (
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
      </div>
    </div>
  );
};

export default CriteriaForm;
