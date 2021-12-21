import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, combineReducers, createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import authenticationReducer, { AuthenticationActionTypes } from '../common/reducers/authentication.reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import verificationProcessReducer, { VerificationProcessActionTypes } from '../common/reducers/verificationProcess.reducer';
import criteriaTypeReducer, { CriteriaTypeActionTypes } from '../common/reducers/criteriaType.reducer';
import criteriaReducer, { CriteriaActionTypes } from '../common/reducers/criteria.reducer';
import verficationProcessManagementReducer, { VerificationProcessManagementActionTypes } from '../pages/VerificationProcessManagement/reducer';
import companyTypeReducer, { CompanyTypeActionTypes } from '../common/reducers/companyType.reducer';
import agentReducer, { AgentActionTypes } from '../common/reducers/agent.reducer';
import verificationConfirmRequirementReducer, { VerificationConfirmRequirementActionTypes } from '../common/reducers/verificationConfirmRequirement.reducer';
import companyTypeModificationReducer, { CompanyTypeModificationActionTypes } from '../common/reducers/companyTypeModification.reducer';
import companyReducer, { CompanyActionTypes } from '../common/reducers/company.reducer';
import violationReportReducer, { ViolationReportActionTypes } from '../common/reducers/violationReport.reducer';
import companyReportReducer, { CompanyReportActionTypes } from '../common/reducers/companyReport.reducer';
import criteriaDetailReducer, { CriteriaDetailActionTypes } from '../common/reducers/criteriaDetail.reducer';
import provinceReducer, { ProvinceActionTypes } from '../common/reducers/province.reducer';
import thirdPartyReducer, { ThirdPartyActionTypes } from '../common/reducers/thirdParty.reducer';

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return [thunk];
  }
  return [thunk, createLogger()];
};

const enhancer = composeWithDevTools(applyMiddleware(...getMiddleware()));

const allReducers = combineReducers({
  agent: agentReducer,
  authentication: authenticationReducer,
  company: companyReducer,
  companyReport: companyReportReducer,
  companyType: companyTypeReducer,
  companyTypeModification: companyTypeModificationReducer,
  criteria: criteriaReducer,
  criteriaDetail: criteriaDetailReducer,
  criteriaType: criteriaTypeReducer,
  province: provinceReducer,
  thirdParty: thirdPartyReducer,
  verificationConfirmRequirement: verificationConfirmRequirementReducer,
  verificationProcess: verificationProcessReducer,
  verificationProcessManagement: verficationProcessManagementReducer,
  violationReport: violationReportReducer,
});

export const store = createStore(allReducers, enhancer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export type AppActions =
  | AgentActionTypes
  | AuthenticationActionTypes
  | CompanyActionTypes
  | CompanyReportActionTypes
  | CompanyTypeActionTypes
  | CompanyTypeModificationActionTypes
  | CriteriaActionTypes
  | CriteriaDetailActionTypes
  | CriteriaTypeActionTypes
  | ProvinceActionTypes
  | ThirdPartyActionTypes
  | VerificationConfirmRequirementActionTypes
  | VerificationProcessActionTypes
  | VerificationProcessManagementActionTypes
  | ViolationReportActionTypes;

export type AppDispatch = ThunkDispatch<RootState, void, AppActions>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
