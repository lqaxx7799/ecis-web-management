import { Switch } from 'react-router';
import AppRoute from './AppRoute';
import MainLayout from './MainLayout';
import { useAppDispatch, useAppSelector } from './store';
import { useEffect } from 'react';
import authenticationActions from '../common/actions/authentication.actions';

import ManagementLayout from './ManagementLayout';
import LogIn from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const App = () => {
  const dispatch = useAppDispatch();
  const authentication = useAppSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(authenticationActions.validate());
  }, []);

  if (!authentication.isInit) {
    return null;
  }

  return (
    <div>
      <Switch>
        <AppRoute path='/dang-nhap' component={LogIn} layout={MainLayout} layoutProps={{ isBleedLayout: true }} />

        {/* <AppRoute path="/" component={CompanySelfVerification} layout={CompanyLayout} needAuth roles={["Company"]} /> */}
        {/* <AppRoute path="/doanh-nghiep" component={CompanyDashboard} layout={CompanyLayout} needAuth roles={["Company"]} /> */}

        <AppRoute exact path='/' component={Dashboard} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
      </Switch>
    </div>
  );
}

export default App;
