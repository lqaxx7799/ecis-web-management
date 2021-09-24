import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import authenticationServices from '../common/services/authentication.services';
import BlankLayout from './BlankLayout';

type Props = {
  component: React.ComponentType<any>;
  layout: React.ComponentType<any>;
  layoutProps?: object;
  needAuth?: boolean;
  roles?: string[];
} & RouteProps;

const AppRoute = ({
  component: Component,
  layout: Layout = BlankLayout,
  layoutProps = {},
  needAuth = false,
  roles,
  ...rest
}: Props) => {
  const isLoggedIn = authenticationServices.isLoggedIn(roles);
  return (
    <Route
      {...rest}
      render={(props) =>
        !needAuth || isLoggedIn ? (
          <Layout {...layoutProps}>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to='/dang-nhap' />
        )
      }
    />
  );
}

export default AppRoute;
