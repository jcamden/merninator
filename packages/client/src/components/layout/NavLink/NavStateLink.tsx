import React, { useState } from 'react';
import { AuthActions, AuthActionTypes, AppActions, AppActionTypes, Page } from '@merninator/types';

interface NavStateLinkProps {
  text: string | JSX.Element;
  action:
    | { type: AuthActionTypes.logOut; payload: {} }
    | { type: AppActionTypes.changePage; payload: Page }
    | { type: AppActionTypes.other; payload: {} };
  dispatch: (arg0: AuthActions | AppActions) => void;
}

export const NavStateLink: React.FC<NavStateLinkProps> = ({ text, action, dispatch }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className={`h5 nav-item ${hovered ? 'text-light' : 'text-secondary'} nav-link px-2 mb-0`}
      onClick={(): void => {
        dispatch(action);
      }}
      onMouseOver={(): void => setHovered(true)}
      onMouseLeave={(): void => setHovered(false)}
    >
      {text}
    </span>
  );
};
