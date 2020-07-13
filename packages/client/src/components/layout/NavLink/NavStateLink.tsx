import React, { useState, useContext } from 'react';
import { AppDispatchContext } from '../../../context/app/AppState';
import { AuthDispatchContext } from '../../../context/auth/AuthState';
import { Page } from '../../../context/app/types';

interface NavLinkProps {
  text: string | JSX.Element;
  appAction?: { type: 'changePage'; payload: Page } | { type: 'other' };
  authAction?: { type: 'logOut' };
}

const NavLink: React.FC<NavLinkProps> = ({ text, appAction, authAction }) => {
  const [hovered, setHovered] = useState(false);
  const appDispatch = useContext(AppDispatchContext);
  const authDispatch = useContext(AuthDispatchContext);
  return (
    <span
      className={`h5 nav-item ${hovered ? 'text-light' : 'text-secondary'} nav-link px-2 mb-0`}
      onClick={(): void => {
        if (appAction?.type === 'changePage' && appAction.payload) {
          appDispatch({ type: appAction.type, payload: appAction.payload });
        } else if (appAction?.type === 'other') {
          appDispatch({ type: appAction.type });
        } else if (authAction?.type === 'logOut') authDispatch({ type: authAction?.type });
      }}
      onMouseOver={(): void => setHovered(true)}
      onMouseLeave={(): void => setHovered(false)}
    >
      {text}
    </span>
  );
};

export default NavLink;
