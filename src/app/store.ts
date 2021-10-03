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
  companyType: companyTypeReducer,
  companyTypeModification: companyTypeModificationReducer,
  criteriaType: criteriaTypeReducer,
  criteria: criteriaReducer,
  verificationConfirmRequirement: verificationConfirmRequirementReducer,
  verificationProcess: verificationProcessReducer,
  verificationProcessManagement: verficationProcessManagementReducer,
});

export const store = createStore(allReducers, enhancer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export type AppActions =
  | AgentActionTypes
  | AuthenticationActionTypes
  | CompanyTypeActionTypes
  | CompanyTypeModificationActionTypes
  | CriteriaTypeActionTypes
  | CriteriaActionTypes
  | VerificationConfirmRequirementActionTypes
  | VerificationProcessActionTypes
  | VerificationProcessManagementActionTypes;

export type AppDispatch = ThunkDispatch<RootState, void, AppActions>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
