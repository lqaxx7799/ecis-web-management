import { FileIcon, TrashIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationConfirmRequirementActions from "../../../common/actions/verificationConfirmRequirement.action";
import { VerificationConfirmRequirementActionTypes } from "../../../common/reducers/verificationConfirmRequirement.reducer";
import fileServices from "../../../common/services/file.services";
import helpers from "../../../common/utils/helpers";
import { VerificationConfirmUpdateDTO } from "../../../types/dto";

type Props = {

};

type RouteParams = {
  id: string;
};

const ConfirmVerificationRequirement = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { id: confirmId } = useParams<RouteParams>();
  const [submitting, setSubmitting] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm<VerificationConfirmUpdateDTO>();
  const watcher = watch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'verificationConfirmDocuments',  
  });

  const { editingRequirement, loading } = useAppSelector((state) => state.verificationConfirmRequirement);

  useEffect(() => {
    dispatch(verificationConfirmRequirementActions.getById(parseInt(confirmId)))
      .then((result) => {
        setValue('verificationConfirmRequirementId', result?.id ?? 0);
      });
  }, [dispatch, confirmId]);

  const showFileDialog = () => {
    fileRef.current?.click();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      const validation = helpers.validateUploadedFiles(files);
      if (validation) {
        toast.error(validation);
        return;
      }

      Promise.all(Array.from(files).map((file) => fileServices.uploadFile(file)))
        .then((result) => {
          _.forEach(result, (item) => {
            append({
              documentName: item.name,
              documentType: item.type,
              documentUrl: item.url,
              documentSize: item.size,
            });
          });
        })
        .catch(() => {
          toast.error('Đã xảy ra lỗi trong quá trình tải tập tin. Vui lòng thử lại sau.');
        });
    }
  };

  const onSubmit = (data: VerificationConfirmUpdateDTO) => {
    setSubmitting(true);
    dispatch(verificationConfirmRequirementActions.finishConfirm(data))
      .then((result) => {
        setSubmitting(false);
        toast.success('Xác minh yêu cầu thành công.');
        dispatch<VerificationConfirmRequirementActionTypes>({
          type: 'VERIFICATION_CONFIRM_REQUIREMENT_EDITING_LOADED',
          payload: result,
        });
        history.push('/verify-verification-browse');
      })
      .catch(() => {
        setSubmitting(false);
        toast.error('Đã xảy ra lỗi trong quá trình xác minh yêu cầu. Vui lòng thử lại sau.');
      });
  };

  if (loading) {
    return (
      <div className="row">
        <Helmet>
          <title>Phân công xác minh sự tuân thủ</title>
        </Helmet>
        <div className="x_panel">
          <div className="x_title">
            <h2>Phân công xác minh sự tuân thủ</h2>
            <div className="clearfix"></div>
          </div>
          <div className="x_content">
            <div className="clearfix"></div>
            <div className="col-xs-12 table"></div>
            <p>Đang tải</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <Helmet>
        <title>Xử lý xác minh sự tuân thủ</title>
      </Helmet>
      <div className="x_panel">
        <div className="x_title">
          <h2>Xử lý xác minh sự tuân thủ</h2>
          <div className="clearfix"></div>
        </div>
        <div className="x_content">
          <div className="clearfix"></div>
          <div className="col-xs-12 table">
            <form className="form-horizontal form-label-left" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Doanh nghiệp cần xác minh</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={_.get(editingRequirement, 'verificationProcess.company.companyNameVI', '')}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Nội dung cần xác minh</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={_.get(editingRequirement, 'verificationCriteria.criteriaDetail.criteriaDetailName', '')}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Cán bộ xử lý</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={`${_.get(editingRequirement, 'assignedAgent.lastName', '')} ${_.get(editingRequirement, 'assignedAgent.firstName', '')}`}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Kết quả</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="documentContent"
                    control={control}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <textarea
                          {...field}
                          ref={ref}
                          rows={10}
                          cols={30}
                          className="form-control"
                        />
                        {errors.documentContent && <span>{errors.documentContent.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Tải tài liệu</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={fileRef}
                    multiple
                    onChange={handleFileUpload}
                  />
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={showFileDialog}
                    style={{ marginBottom: '12px' }}
                  >
                    Tải tập tin
                  </button>

                  <div style={{ width: '400px' }}>
                    {fields.map((field, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                          <FileIcon /> {field.documentName}
                        </div>
                        
                        <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                          <TrashIcon /> Gỡ tài liệu
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-6 col-md-offset-3">
                  <Link to='/verify-verification-browse' className="btn btn-primary">Hủy bỏ</Link>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={submitting}
                  >
                    Thực hiện
                  </button>
                </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmVerificationRequirement;
