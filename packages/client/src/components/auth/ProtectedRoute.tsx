import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { StateContext, DispatchContext } from '../../context/auth/AuthState';

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
  const { user } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  dispatch({ type: 'isLoading' });

  const getRedirectPath = (): string | undefined => {
    if (!user) {
      return unauthedRedirectPath;
    } else if (user && isAllowed === false) {
      return restrictedRedirectPath;
    }
  };

  const redirectPath = getRedirectPath();

  if (redirectPath) {
    const redirectComponent: React.FC = () => <Redirect to={{ pathname: redirectPath }} />;
    dispatch({ type: 'isNotLoading' });
    return <Route exact component={redirectComponent} render={undefined} />;
  } else {
    dispatch({ type: 'isNotLoading' });
    return <Route exact path={path} component={component} />;
  }
};

export default ProtectedRoute;
