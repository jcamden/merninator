import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  isAllowed?: boolean;
  restrictedRedirectPath?: string;
  unauthedRedirectPath?: string;
  path: string;
  component: React.FC;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  isAllowed,
  restrictedRedirectPath,
  unauthedRedirectPath,
  path,
  component,
}) => {
  const getRedirectPath = (): string | undefined => {
    if (!isAuthenticated) {
      return unauthedRedirectPath;
    } else if (isAuthenticated && !isAllowed) {
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
