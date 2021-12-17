import { useState } from "react";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../app/store";
import accountActions from "../../../common/actions/account.action";
import { ChangePasswordDTO } from "../../../types/dto";

type Props = {

};

const ChangePassword = (props: Props) => {
  const dispatch = useAppDispatch();

  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm<ChangePasswordDTO>();

  const resetForm = () => {
    reset({
      newPassword: '',
      oldPassword: '',
      reenterNewPassword: '',
    });
  };

  const onSubmit = (data: ChangePasswordDTO) => {
    if (data.reenterNewPassword !== data.newPassword) {
      setError(
        'reenterNewPassword',
        {
          message: 'Nhập lại mật khẩu mới không khớp',
        },
        {
          shouldFocus: true,
        }
      );
      return;
    }

    setSubmitting(true);
    dispatch(accountActions.changePassword(data))
      .then(() => {
        toast.success('Đổi mật khẩu thành công.');
        resetForm();
        setSubmitting(false);
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          switch (err?.response?.data?.message) {
            case 'WrongOldPassword':
              setError('oldPassword', 
                {
                  message: 'Mật khẩu cũ không đúng',
                },
                {
                  shouldFocus: true,
                }
              );
              break;
            default:
              toast.error('Đã xảy ra lỗi trong quá trình đổi mật khẩu. Vui lòng thử lại sau.');
              break;
          }
        } else {
          toast.error('Đã xảy ra lỗi trong quá trình đổi mật khẩu. Vui lòng thử lại sau.');
        }
        setSubmitting(false);
      });
  };

  return (
    <div className="row">
      <Helmet>
        <title>Đổi mật khẩu</title>
      </Helmet>
      <div className="x_panel">
        <div className="x_title">
          <h2>Đổi mật khẩu</h2>
          <div className="clearfix"></div>
        </div>
        <div className="x_content">
          <div className="clearfix"></div>
          <div className="col-xs-12 table">
            <form className="form-horizontal form-label-left" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Mật khẩu hiện tại (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="oldPassword"
                    control={control}
                    rules={{ required: 'Không được để trống mật khẩu hiện tại' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          placeholder="Mật khẩu hiện tại"
                          className="form-control"
                          type="password"
                        />
                        {errors.oldPassword && <span>{errors.oldPassword.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Mật khẩu mới (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="newPassword"
                    control={control}
                    rules={{
                      required: 'Không được để trống mật khẩu mới',
                      minLength: {
                        value: 8,
                        message: 'Mật khẩu mới phải dài hơn 8 ký tự',
                      },
                    }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          placeholder="Mật khẩu mới"
                          className="form-control"
                          type="password"
                        />
                        {errors.newPassword && <span>{errors.newPassword.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Nhập lại mật khẩu mới (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="reenterNewPassword"
                    control={control}
                    rules={{ required: 'Không được để trống nhập lại mật khẩu mới' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          placeholder="Nhập lại mật khẩu mới"
                          className="form-control"
                          type="password"
                        />
                        {errors.reenterNewPassword && <span>{errors.reenterNewPassword.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-6 col-md-offset-3">
                  <button type="button" onClick={resetForm} className="btn btn-primary">Hủy bỏ</button>
                  <button type="submit" className="btn btn-success" disabled={submitting}>Thực hiện</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
