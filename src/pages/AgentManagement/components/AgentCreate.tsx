import _ from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import agentActions from "../../../common/actions/agent.action";
import provinceActions from "../../../common/actions/province.action";
import { AgentCreateDTO } from "../../../types/dto";

type Props = {

};

export interface AgentCreateDTOTemp {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  address: string;
  dateOfBirth: string;
  provinceIds: string[];
};

const AgentCreate = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { provinces } = useAppSelector((state) => state.province);
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
  } = useForm<AgentCreateDTOTemp>();

  useEffect(() => {
    dispatch(provinceActions.getAll());
    setValue('gender', 'male');
  }, [dispatch]);

  const onChangeProvinces = (e: ChangeEvent<HTMLSelectElement>, onChange: (value: any) => void) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    onChange(value);
  };

  const onSubmit = (data: AgentCreateDTOTemp) => {
    setSubmitting(true);
    if (_.isEmpty(data.provinceIds)) {
      setError(
        'provinceIds',
        {
          message: 'Không được để trống tỉnh phụ trách',
        }
      );
      return;
    }
    const formattedData: AgentCreateDTO = {
      ...data,
      provinceIds: _.map(data.provinceIds, (item) => parseInt(item)),
    };
    dispatch(agentActions.create(formattedData))
      .then((result) => {
        setSubmitting(false);
        toast.success('Thêm mới kiểm lâm tỉnh thành công');
        history.push('/agent');
      })
      .catch((err) => {
        const messageError = _.get(err, 'response.data.message');
        if (messageError === 'EmailExisted') {
          setError('email', { message: 'Email đã tồn tại trong hệ thống' });
          setSubmitting(false);
          return;
        }
        toast.error('Đã có lỗi xảy ra trong quá trình thêm mới doanh nghiệp. Vui lòng thử lại sau.');
        setSubmitting(false);
      });
  };

  return (
    <div className="row">
      <Helmet>
        <title>Thêm mới kiểm lâm tỉnh</title>
      </Helmet>
      <div className="x_panel">
        <div className="x_title">
          <h2>Thêm mới kiểm lâm tỉnh</h2>
          <div className="clearfix"></div>
        </div>
        <div className="x_content">
          <div className="clearfix"></div>
          <div className="col-xs-12 table">
            <form className="form-horizontal form-label-left" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Email (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Không được để trống email' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          className="form-control"
                          placeholder="Nhập email"
                        />
                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Họ (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: 'Không được để trống họ' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          className="form-control"
                          placeholder="Nhập họ"
                        /> 
                        {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Tên (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: 'Không được để trống tên' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          className="form-control"
                          placeholder="Nhập tên"
                        />
                        {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Địa chỉ (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="address"
                    control={control}
                    rules={{ required: 'Không được để trống địa chỉ' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          className="form-control"
                          placeholder="Nhập địa chỉ"
                        />
                        {errors.address && <span className="text-danger">{errors.address.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Số điện thoại (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{ required: 'Không được để trống số điện thoại' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          className="form-control"
                          placeholder="Nhập số điện thoại"
                        />
                        {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Ngày sinh (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{ required: 'Không được để trống ngày sinh' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          className="form-control"
                          placeholder="Nhập ngày sinh"
                          type="date"
                        />
                        {errors.dateOfBirth && <span className="text-danger">{errors.dateOfBirth.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Giới tính (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: 'Không được để trống tên' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <select
                          {...field}
                          ref={ref}
                          className="form-control"
                          placeholder="Nhập giới tính"
                        >
                          <option value="male">Nam</option>
                          <option value="female">Nữ</option>
                          <option value="other">Khác</option>
                        </select>
                        {errors.gender && <span className="text-danger">{errors.gender.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Tỉnh phụ trách (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="provinceIds"
                    control={control}
                    rules={{ required: 'Không được để trống tỉnh phụ trách' }}
                    render={({ field: { ref, onChange, ...field } }) => (
                      <div>
                        <select
                          {...field}
                          ref={ref}
                          onChange={(e) => onChangeProvinces(e, onChange)}
                          className="form-control"
                          placeholder="Chọn tỉnh"
                          multiple
                        >
                          {
                            _.map(provinces, (province) => (
                              <option value={province.id} key={province.id}>{province.provinceName}</option>
                            ))
                          }
                        </select>
                        {_.get(errors, 'provinceIds') && <span className="text-danger">{_.get(errors, 'provinceIds.message')}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-6 col-md-offset-3">
                  <Link to="/agent" className="btn btn-primary">Hủy bỏ</Link>
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

export default AgentCreate;
