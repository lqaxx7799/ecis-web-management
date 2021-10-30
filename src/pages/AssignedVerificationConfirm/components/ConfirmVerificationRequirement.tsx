import { useNotifications } from "@mantine/notifications";
import _ from "lodash";
import { ChangeEvent, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationConfirmRequirementActions from "../../../common/actions/verificationConfirmRequirement.action";
import { VerificationConfirmRequirementActionTypes } from "../../../common/reducers/verificationConfirmRequirement.reducer";
import fileServices from "../../../common/services/file.services";
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm<VerificationConfirmUpdateDTO>();
  const watcher = watch();

  const { editingRequirement, loading } = useAppSelector((state) => state.verificationConfirmRequirement);

  useEffect(() => {
    dispatch(verificationConfirmRequirementActions.getById(parseInt(confirmId)))
      .then((result) => {
        setValue('verificationConfirmRequirementId', result?.id ?? 0);
      });
  }, [dispatch, confirmId]);

  // const onSelectFileDialog = () => {
  //   fileInputRef?.current?.click();
  // };

  // const handleAnnounceFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { files } = e.target;
  //   if (files?.length) {
  //     fileServices.uploadFile(files[0])
  //       .then((result) => {
  //         toast.success('Tải tài liệu thành công.');
  //         setValue('documentName', result.name);
  //         setValue('documentType', result.type);
  //         setValue('documentUrl', result.url);
  //         setValue('documentSize', result.size);
  //       })
  //       .catch((err) => {
  //         toast.error('Đã xảy ra lỗi trong quá trình tải tài liệu. Vui lòng thử lại sau.');
  //       });
  //   }
  // };

  const onSubmit = (data: VerificationConfirmUpdateDTO) => {
    dispatch(verificationConfirmRequirementActions.finishConfirm(data))
      .then((result) => {
        toast.success('Xác minh yêu cầu thành công.');
        dispatch<VerificationConfirmRequirementActionTypes>({
          type: 'VERIFICATION_CONFIRM_REQUIREMENT_EDITING_LOADED',
          payload: result,
        });
        history.push('/verify-verification-browse');
      })
      .catch(() => {
        toast.error('Đã xảy ra lỗi trong quá trình xác minh yêu cầu. Vui lòng thử lại sau.');
      });
  };

  if (loading) {
    return (
      <div className="row">
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
      <div className="x_panel">
        <div className="x_title">
          <h2>Phân công xác minh sự tuân thủ</h2>
          <div className="clearfix"></div>
        </div>
        <div className="x_content">
          <div className="clearfix"></div>
          <div className="col-xs-12 table">
            <form className="form-horizontal form-label-left" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Công ty cần xác minh</label>
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
                <div className="col-md-6 col-md-offset-3">
                  <Link to='/verify-verification-browse' className="btn btn-primary">Hủy bỏ</Link>
                  <button type="submit" className="btn btn-success">Thực hiện</button>
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
