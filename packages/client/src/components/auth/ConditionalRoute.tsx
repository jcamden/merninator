import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { AuthStateContext, AuthDispatchContext } from '../../context/auth/AuthState';

// I haven't used this anywhere.
// I think I never got it to work how I wanted.

export interface ProtectedRouteProps extends RouteProps {
  restricted?: string;
  noUser?: string;
  loggedIn?: string;
  path: string;
  component: React.FC;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ restricted, noUser, loggedIn, path, component }) => {
  const { user, authLoading } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);

  authDispatch({ type: 'authLoading' });

  console.log(loggedIn);
  console.log(user);

  const getRedirectPath = (): string | undefined => {
    if (!user && !authLoading) {
      return noUser;
    } else if (user && !restricted) {
      return restricted;
    } else if (user && loggedIn) {
      return loggedIn;
    }
  };

  const redirectPath = getRedirectPath();
  console.log(redirectPath);

  if (redirectPath) {
    const redirectComponent: React.FC = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route exact component={redirectComponent} render={undefined} />;
  } else {
    return <Route exact path={path} component={component} />;
  }
};

export default ProtectedRoute;
