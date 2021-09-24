import { Button, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
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
    console.log(111111, data);
    dispatch(authenticationActions.authenticate(data))
      .then((result) => {
        console.log(111111, result);
        history.push('/');
      })
      .catch((err) => {
        console.log(1111112, err.response);
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
    <div className="log-in-admin">
      <Paper padding="lg" shadow="sm" className="log-in-form">
        <Title order={2} style={{ marginBottom: '24px' }}>Quản lý hệ thống ECIS</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Không được để trống email' }}
            render={({ field: { ref, ...field } }) => (
              <TextInput
                {...field}
                elementRef={ref}
                style={{
                  marginBottom: '12px',
                }}
                label="Email"
                required
                placeholder="Nhập email"
                error={errors.email && errors.email.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Không được để trống mật khẩu', }}
            render={({ field: { ref, ...field } }) => (
              <PasswordInput
                {...field}
                elementRef={ref}
                style={{
                  marginBottom: '12px',
                }}
                label="Mật khẩu"
                required
                placeholder="Nhập mật khẩu"
                error={errors.password && errors.password.message}
              />
            )}
          />
          <Button type="submit">Đăng nhập</Button>
        </form>
      </Paper>
    </div>
  );
};

export default LogIn;
