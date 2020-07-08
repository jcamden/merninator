import React, { ReactNode, useContext } from 'react';
import { AuthStateContext } from '../../context/auth/AuthState';
import PropTypes from 'prop-types';

interface CheckAuthProps {
  preInitAuth?: ReactNode;
  noUser?: ReactNode;
  component: ReactNode;
}

const CheckAuth: React.FC<CheckAuthProps> = ({ preInitAuth, noUser, component }) => {
  const { checkedAuth, user } = useContext(AuthStateContext);

  if (preInitAuth && noUser) {
    return <>{checkedAuth ? (user ? component : noUser) : preInitAuth}</>;
  } else if (preInitAuth) {
    return <>{checkedAuth ? component : preInitAuth}</>;
  } else if (noUser) {
    return <>{user ? component : noUser}</>;
  } else {
    return <>{component}</>;
  }
};

CheckAuth.propTypes = {
  preInitAuth: PropTypes.node,
  noUser: PropTypes.node,
  component: PropTypes.node,
};
export default CheckAuth;
