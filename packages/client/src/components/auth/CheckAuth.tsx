import React, { ReactNode, useContext } from 'react';
import { AuthStateContext } from '../../context/auth/AuthState';

interface CheckAuthProps {
  preInitAuth?: ReactNode;
  noUser?: ReactNode;
  component: ReactNode;
}

export const CheckAuth: React.FC<CheckAuthProps> = ({ preInitAuth, noUser, component }) => {
  const { checkedAuth, user } = useContext(AuthStateContext);
  const self = user?.self;

  if (preInitAuth && noUser) {
    return <>{checkedAuth ? (self === 'guest' ? noUser : component) : preInitAuth}</>;
  } else if (preInitAuth) {
    return <>{checkedAuth ? component : preInitAuth}</>;
  } else if (noUser) {
    return <>{self === 'guest' ? noUser : component}</>;
  } else {
    return <>{component}</>;
  }
};
