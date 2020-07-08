import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { AuthStateContext, AuthDispatchContext } from '../../context/auth/AuthState';

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
  const { user, loading } = useContext(AuthStateContext);
  const dispatch = useContext(AuthDispatchContext);

  dispatch({ type: 'loading' });

  const getRedirectPath = (): string | undefined => {
    if (!user && !loading) {
      return unauthedRedirectPath;
    } else if (user && isAllowed === false) {
      return restrictedRedirectPath;
    }
  };

  const redirectPath = getRedirectPath();

  if (redirectPath) {
    const redirectComponent: React.FC = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route exact component={redirectComponent} render={undefined} />;
  } else {
    return <Route exact path={path} component={component} />;
  }
};

export default ProtectedRoute;
