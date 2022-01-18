import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../app/store';
import authenticationActions from '../../common/actions/authentication.actions';
import { LogInDTO } from '../../types/dto';
import './logIn.scss';

type Props = {

};

const LogIn = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LogInDTO>();

  const onSubmit = (data: LogInDTO) => {
    dispatch(authenticationActions.authenticate(data))
      .then((result) => {
        history.push('/');
      })
      .catch((err) => {
        setError(
          'email',
          {
            type: 'wrongEmail',
            message: err.response.data.message,
          },
          { shouldFocus: true }
        );
      });
  };

  return (
    <div className="login" style={{ backgroundImage: 'url(/images/bg1.jpg)' , backgroundSize: 'cover', height: '100vh' }}>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <div style={{ background: 'rgba(0,0,0,0.5)', position: 'absolute', width: '100%', height: '100vh' }}>
        <a className="hiddenanchor" id="signup"></a>
        <a className="hiddenanchor" id="signin"></a>

        <div className="login_wrapper">
          <div className="animate form login_form">
            <section className="login_content">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1><img src="/images/fpd_logo_small.png" alt="" /> Đăng nhập hệ thống</h1>
                <div>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Không được để trống email' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          required
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                      </div>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Không được để trống mật khẩu' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          type="password"
                          className="form-control"
                          placeholder="Mật khẩu"
                          required
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                      </div>
                    )}
                  />
                </div>
                <div>
                  <button className="btn btn-default submit">Đăng nhập</button>
                  {/* <a className="reset_pass" href="#">Quên mật khẩu ?</a> */}
                </div>

                <div className="clearfix"></div>

                <div className="separator">
                  <div>
                    <p>©2020</p>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
