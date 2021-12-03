import _ from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import agentActions from "../../../common/actions/agent.action";
import verificationConfirmRequirementActions from "../../../common/actions/verificationConfirmRequirement.action";
import { VerificationConfirmRequirementActionTypes } from "../../../common/reducers/verificationConfirmRequirement.reducer";
import { VerificationConfirmRequirementDTO } from "../../../types/dto";
import assignVerifyActions from "../action";

type Props = {

};

interface VerificationConfirmRequirementDTOTemp {
  scheduledTime: Date; 
  scheduledLocation: string;
  announceAgentDocumentContent: string;
  verificationProcessId: string;
  assignedAgentId: string;
  verificationCriteriaId: string;
};

const AssignVerify = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    reset,
  } = useForm<VerificationConfirmRequirementDTOTemp>();
  
  const { agents } = useAppSelector((state) => state.agent);
  const { editingProcess, verificationCriterias } = useAppSelector((state) => state.verificationProcessManagement);
  const qs = new URLSearchParams(history.location.search);
  const companyId = parseInt(qs.get('companyId') ?? '0');

  useEffect(() => {
    dispatch(agentActions.getAllAgents());
    dispatch(assignVerifyActions.getCompanyCurrentPending(companyId))
      .then((result) => {
        setValue('verificationProcessId', result.id.toString());
      })
      .catch(() => {

      });
  }, [dispatch, companyId]);

  const onSubmit = (data: VerificationConfirmRequirementDTOTemp) => {
    if (data.verificationCriteriaId === '-- Chọn tiêu chí --') {
      setError('verificationCriteriaId', { message: 'Không được để trống tiêu chí' });
      return;
    }
    if (data.assignedAgentId === '-- Chọn cán bộ --') {
      setError('assignedAgentId', { message: 'Không được để trống cán bộ' });
      return;
    }

    setSubmitting(true);
    const formattedData: VerificationConfirmRequirementDTO = {
      ...data,
      verificationProcessId: parseInt(data.verificationProcessId),
      assignedAgentId: parseInt(data.assignedAgentId),
      verificationCriteriaId: parseInt(data.verificationCriteriaId),
    };
    dispatch(verificationConfirmRequirementActions.create(formattedData))
      .then((result) => {
        setSubmitting(false);
        toast.success('Yêu cầu cán bộ thành công');
        dispatch<VerificationConfirmRequirementActionTypes>({
          type: 'VERIFICATION_CONFIRM_REQUIREMENT_EDITING_LOADED',
          payload: result,
        });
        reset();
      })
      .catch(() => {
        setSubmitting(false);
        toast.error('Đã có lỗi xảy ra trong quá trình yêu cầu cán bộ. Vui lòng thử lại sau.');
      });
  };

  if (!companyId) {
    return <Redirect to="/" />;
  }

  if (!editingProcess) {
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
            <p>
              Doanh nghiệp hiện tại chưa trong quá trình đánh giá. Vui lòng yêu cầu doanh nghiệp đánh giá trước tại{' '}
              <Link to={`/company/${companyId}`}>đây</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="col-xs-12 table">
            <form className="form-horizontal form-label-left" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Doanh nghiệp cần xác minh</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={editingProcess?.company?.companyNameVI}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Tiêu chí cần xác minh</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="verificationCriteriaId"
                    control={control}
                    rules={{ required: 'Không được để trống tiêu chí' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <select
                          {...field}
                          ref={ref}
                          className="form-control"
                        >
                          <option value={undefined}>-- Chọn tiêu chí --</option>
                          {
                            _.map(verificationCriterias, (criteria) => (
                              <option key={criteria.id} value={criteria.id}>{criteria?.criteriaDetail?.criteriaDetailName}</option>
                            ))
                          }
                        </select>    
                        {errors.verificationCriteriaId && <span>{errors.verificationCriteriaId.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Mô tả</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="announceAgentDocumentContent"
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
                        {errors.announceAgentDocumentContent && <span>{errors.announceAgentDocumentContent.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Phân công cho</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="assignedAgentId"
                    control={control}
                    rules={{ required: 'Không được để trống cán bộ' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <select
                          {...field}
                          ref={ref}
                          className="form-control"
                        >
                          <option value={undefined}>-- Chọn cán bộ --</option>
                          {
                            _.map(agents, (agent) => (
                              <option key={agent.id} value={agent.id}>{agent.lastName} {agent.firstName}</option>
                            ))
                          }
                        </select>    
                        {errors.assignedAgentId && <span>{errors.assignedAgentId.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-6 col-md-offset-3">
                  <Link to={`/verification/${editingProcess.id}`} className="btn btn-primary">Hủy bỏ</Link>
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

export default AssignVerify;
