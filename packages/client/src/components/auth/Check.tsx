import React, { ReactNode, useContext } from 'react';
import { AuthStateContext } from '../../context/auth/AuthState';

interface CheckAuthProps {
  preInitAuth?: ReactNode;
  noUser?: ReactNode;
  component: ReactNode;
}

const CheckAuth: React.FC<CheckAuthProps> = ({ preInitAuth, noUser, component }) => {
  const { checkedAuth, user } = useContext(AuthStateContext);
  const id = user?._id;

  if (preInitAuth && noUser) {
    return <>{checkedAuth ? (id === 'guest' ? noUser : component) : preInitAuth}</>;
  } else if (preInitAuth) {
    return <>{checkedAuth ? component : preInitAuth}</>;
  } else if (noUser) {
    return <>{id === 'guest' ? noUser : component}</>;
  } else {
    return <>{component}</>;
  }
};

export default CheckAuth;
