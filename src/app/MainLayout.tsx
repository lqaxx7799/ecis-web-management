import { Button, Container, Divider, Menu, MenuItem, MenuLabel, Text, Title } from '@mantine/core';
import { PersonIcon, PinLeftIcon, TriangleDownIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import authenticationActions from '../common/actions/authentication.actions';
import { useAppDispatch, useAppSelector } from './store';

type Props = {
  children?: React.ReactNode;
  isBleedLayout?: boolean;
};

const MainLayout = ({ children, isBleedLayout }: Props) => {
  const dispatch = useAppDispatch();
  const authentication = useAppSelector((state) => state.authentication);

  const logOut = () => {
    dispatch(authenticationActions.logOut());
  };

  return (
    <>
      <div className="header">
        <div className="header-main">
          <Button component={Link} to="/" variant="link"><Title>ECIS Management</Title></Button>
        </div>
        <div className="spacer" />
        <div className="header-end">
          {
            authentication.account ? (
              <Menu
                zIndex={7}
                control={(
                  <Button variant="link">
                    Xin chào, {authentication.account?.email}
                    <TriangleDownIcon />
                  </Button>
                )}
              >
                <MenuLabel>Tài khoản</MenuLabel>
                <MenuItem component={Link} to="/doanh-nghiep" icon={<PersonIcon />}>Quản lý tài khoản</MenuItem>

                <Divider />
                <MenuItem color="red" icon={<PinLeftIcon />} onClick={logOut}>Đăng xuất</MenuItem>                
              </Menu>
            ) : null
          }
        </div>
      </div>
      {
        isBleedLayout ? children : (
          <Container className="layout-main">
            {children}
          </Container>
        )
      }
    </>
  );
}

export default MainLayout;