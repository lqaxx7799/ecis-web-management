import { Switch } from 'react-router';
import AppRoute from './AppRoute';
import MainLayout from './MainLayout';
import { useAppDispatch, useAppSelector } from './store';
import { useEffect } from 'react';
import authenticationActions from '../common/actions/authentication.actions';

import ManagementLayout from './ManagementLayout';
import LogIn from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import VerificationProcessManagement from '../pages/VerificationProcessManagement/components';
import VerifyPendingProcessList from '../pages/VerificationProcessManagement/components/ReviewVerification/VerifyPendingProcessList';
import SupportVerificationList from '../pages/VerificationProcessManagement/components/SupportVerification/SupportVerificationList';
import CompanyEditVerification from '../pages/VerificationProcessManagement/components/SupportVerification/CompanyEditVerification';
import VerifyPendingProcessDetail from '../pages/VerificationProcessManagement/components/ReviewVerification/VerifyPendingProcessDetail';
import VerifyCompleteList from '../pages/VerificationProcessManagement/components/CompleteVerification/VerifyCompleteList';
import VerifyCompleteDetail from '../pages/VerificationProcessManagement/components/CompleteVerification/VerifyCompleteDetail';
import AssignedVerificationConfirmList from '../pages/AssignedVerificationConfirm/components/AssignedVerificationConfirmList';

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

        <AppRoute path="/qua-trinh-danh-gia/ho-tro/:id" component={CompanyEditVerification} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/qua-trinh-danh-gia/ho-tro" component={SupportVerificationList} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/qua-trinh-danh-gia/phan-loai/:id" component={VerifyPendingProcessDetail} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/qua-trinh-danh-gia/phan-loai" component={VerifyPendingProcessList} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/qua-trinh-danh-gia/xac-nhan/:id" component={VerifyCompleteDetail} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/qua-trinh-danh-gia/xac-nhan" component={VerifyCompleteList} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/qua-trinh-danh-gia" component={VerificationProcessManagement} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />

        <AppRoute path="/yeu-cau-xac-thuc" component={AssignedVerificationConfirmList} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />

        <AppRoute exact path='/' component={Dashboard} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
      </Switch>
    </div>
  );
}

export default App;
