import { AuthActionTypes } from '@merninator/types';
import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { AuthDispatchContext, AuthStateContext } from '../../context/auth/AuthState';

export interface ProtectedRouteProps extends RouteProps {
  isAllowed?: boolean;
  restrictedRedirectPath?: string;
  unauthedRedirectPath?: string;
  path: string;
  component: React.FC;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  restrictedRedirectPath,
  unauthedRedirectPath,
  path,
  component,
}) => {
  const { user, authLoading } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);

  authDispatch({ type: AuthActionTypes.authLoading, payload: {} });

  const getRedirectPath = (): string | undefined => {
    if (user?.self === 'guest' && !authLoading) {
      return unauthedRedirectPath;
    } else if (user?.self !== 'guest' && isAllowed === false) {
      return restrictedRedirectPath;
    }
  };

  const redirectPath = getRedirectPath();

  if (redirectPath) {
    const redirectComponent: React.FC = () => <Redirect to={{ pathname: redirectPath }} />;
    authDispatch({ type: AuthActionTypes.authNotLoading, payload: {} });
    return <Route exact component={redirectComponent} render={undefined} />;
  } else {
    return <Route exact path={path} component={component} />;
  }
};
