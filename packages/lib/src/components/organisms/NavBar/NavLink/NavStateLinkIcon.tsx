import { AppActionTypes, AuthActionTypes, IDispatch, Page } from '@merninator/types';
import React, { useState } from 'react';

interface NavStateLinkProps {
  text: JSX.Element;
  actions: ({ type: AuthActionTypes.logOut; payload: {} } | { type: AppActionTypes.changePage; payload: Page })[];
  dispatch: IDispatch;
  size: string;
  px: number;
  page: string;
  onSetQsPage: string | string[] | ((newValue: string) => void);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NavStateLinkIcon: React.FC<NavStateLinkProps> = ({ text, actions, dispatch, size, px }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      style={{
        cursor: hovered ? 'pointer' : 'default',
        fontSize: size,
      }}
      className={`nav-item nav-link px-${px}`}
      onClick={(): void => {
        actions.forEach(action => dispatch(action));
      }}
      onMouseOver={(): void => setHovered(true)}
      onMouseLeave={(): void => setHovered(false)}
    >
      {text}
    </span>
  );
};
