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
// import SupportVerificationList from '../pages/VerificationProcessManagement/components/SupportVerification/SupportVerificationList';
import CompanyEditVerification from '../pages/VerificationProcessManagement/components/SupportVerification/CompanyEditVerification';
import VerifyPendingProcessDetail from '../pages/VerificationProcessManagement/components/VerificationDetail/VerifyPendingProcessDetail';
import ReviewedVerificationList from '../pages/VerificationProcessManagement/components/ReviewedVerificationList';
import VerifyCompleteDetail from '../pages/VerificationProcessManagement/components/ReviewedVerificationList/VerifyCompleteDetail';
import AssignedVerificationConfirmList from '../pages/AssignedVerificationConfirm/components/AssignedVerificationConfirmList';
import CompanyTypeModificationResult from '../pages/CompanyTypeModificationResult/components';
import CompanyManagement from '../pages/CompanyManagement/components';
import ReportViolation from '../pages/CompanyManagement/components/ReportViolation';
import VerifyViolationReport from '../pages/CompanyManagement/components/VerifyViolationReport';
import CompanyReportManagement from '../pages/CompanyReportManagement/components';
import BlankLayout from './BlankLayout';
import SupportVerificationList from '../pages/SupportVerification/components';
import SupportVerificationDetail from '../pages/SupportVerification/components/SupportVerificationDetail';
import NotFound from '../pages/NotFound/components';
import CompanyDetail from '../pages/CompanyManagement/components/CompanyDetail';
import { ToastContainer } from 'react-toastify';
import AssignVerify from '../pages/AssignVerify/components';
import ConfirmVerificationRequirement from '../pages/AssignedVerificationConfirm/components/ConfirmVerificationRequirement';
import VerificationConfirmResult from '../pages/VerificationConfirmResult/components';

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
    <>
      <Switch>        
        <AppRoute path='/login' component={LogIn} layout={BlankLayout} />

        {/* <AppRoute path="/qua-trinh-danh-gia/ho-tro/:id" component={CompanyEditVerification} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} /> */}
        {/* <AppRoute path="/qua-trinh-danh-gia/ho-tro" component={SupportVerificationList} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} /> */}
        {/* <AppRoute path="/qua-trinh-danh-gia/phan-loai/:id" component={VerifyPendingProcessDetail} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/qua-trinh-danh-gia/phan-loai" component={VerifyPendingProcessList} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/qua-trinh-danh-gia/xac-nhan/:id" component={VerifyCompleteDetail} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/qua-trinh-danh-gia/xac-nhan" component={VerifyCompleteList} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} /> */}

        <AppRoute path="/verify-verification-assign" component={AssignVerify} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/verify-verification-browse/:id" component={ConfirmVerificationRequirement} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/verify-verification-browse" component={AssignedVerificationConfirmList} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/verify-verification-result" component={VerificationConfirmResult} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />

        <AppRoute path="/support-verification/:id" component={SupportVerificationDetail} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/support-verification" component={SupportVerificationList} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/verification/:id" component={VerifyPendingProcessDetail} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/verification" component={VerificationProcessManagement} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />
        
        <AppRoute path="/verification-reviewed" component={ReviewedVerificationList} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/verification-result" component={CompanyTypeModificationResult} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />

        <AppRoute path="/company/:id" component={CompanyDetail} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/company" component={CompanyManagement} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />


        <AppRoute path="/ket-qua-danh-gia" component={CompanyTypeModificationResult} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
        
        <AppRoute path="/xu-ly-yeu-cau/:id?" component={CompanyReportManagement} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />

        <AppRoute path="/doanh-nghiep/duyet-bao-cao/:id?" component={VerifyViolationReport} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute path="/doanh-nghiep/bao-cao" component={ReportViolation} layout={ManagementLayout} needAuth roles={["Agent", "Admin"]} />
        
        <AppRoute exact path='/' component={Dashboard} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />
        <AppRoute component={NotFound} layout={MainLayout} needAuth roles={["Agent", "Admin"]} />

      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
