import { AppActionTypes, AuthActionTypes, IDispatch, Modal, Page } from '@merninator/types';
import React, { useState } from 'react';

interface NavStateLinkProps {
  text: string;
  actions: (
    | { type: AuthActionTypes.logOut; payload: '' }
    | { type: AppActionTypes.changePage; payload: Page }
    | { type: AppActionTypes.setModal; payload: Modal }
  )[];
  dispatch: IDispatch;
  size: string;
  px: number;
  page: string;
  onSetQsPage: (newValue: string) => void;
}

export const NavStateLink: React.FC<NavStateLinkProps> = ({ text, actions, dispatch, size, px, onSetQsPage }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      style={{
        cursor: hovered ? 'pointer' : 'default',
        fontSize: size,
      }}
      className={`nav-item nav-link px-${px} text-dark py-0`}
      // className={`nav-item nav-link px-${px} ${text.toLowerCase() === page.toLowerCase() &&
      //   'font-weight-bold text-dark'}`}
      onClick={(): void => {
        actions.forEach(action => dispatch(action));
        const newPage = actions.find(action => action.type === AppActionTypes.changePage)?.payload;

        if (
          (newPage === '' || 'login' || 'register' || 'profile' || 'projects' || 'home' || 'about') &&
          newPage !== undefined
        )
          onSetQsPage(newPage);
      }}
      onMouseOver={(): void => setHovered(true)}
      onMouseLeave={(): void => setHovered(false)}
    >
      {text}
    </span>
  );
};
