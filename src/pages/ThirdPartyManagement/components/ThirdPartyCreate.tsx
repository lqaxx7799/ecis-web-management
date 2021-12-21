import _ from "lodash";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import thirdPartyActions from "../../../common/actions/thirdParty.action";
import { ThirdPartyRegisterDTO } from "../../../types/dto";

type Props = {

};

const ThirdPartyCreate = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ThirdPartyRegisterDTO>();

  const onSubmit = (data: ThirdPartyRegisterDTO) => {
    setSubmitting(true);

    dispatch(thirdPartyActions.create(data))
      .then((result) => {
        setSubmitting(false);
        toast.success('Thêm mới bên thụ hưởng thành công');
        history.push('/third-party');
      })
      .catch((err) => {
        const messageError = _.get(err, 'response.data.message');
        if (messageError === 'EmailExisted') {
          setError('email', { message: 'Email đã tồn tại trong hệ thống' });
          setSubmitting(false);
          return;
        }
        toast.error('Đã có lỗi xảy ra trong quá trình thêm mới bên thụ hưởng. Vui lòng thử lại sau.');
        setSubmitting(false);
      });
  };

  return (
    <div className="row">
      <Helmet>
        <title>Thêm mới bên thụ hưởng</title>
      </Helmet>
      <div className="x_panel">
        <div className="x_title">
          <h2>Thêm mới bên thụ hưởng</h2>
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
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Tên người dùng (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="userName"
                    control={control}
                    rules={{ required: 'Không được để trống tên người dùng' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          className="form-control"
                          placeholder="Nhập tên người dùng"
                        /> 
                        {errors.userName && <span className="text-danger">{errors.userName.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-6 col-md-offset-3">
                  <Link to="/third-party" className="btn btn-primary">Hủy bỏ</Link>
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

export default ThirdPartyCreate;
