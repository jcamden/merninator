import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppActionTypes, AuthActionTypes, AuthStateInterface, IDispatch } from '@merninator/types';
import React from 'react';

import logo from '../../atoms/merninator-medium.svg';
import { NavStateLink } from './NavLink/NavStateLink';
import { NavStateLinkIcon } from './NavLink/NavStateLinkIcon';

interface NavBarProps {
  dispatch: IDispatch;
  onSetQsPage: (newValue: string) => void;
  page: string;
  user: AuthStateInterface['user'];
}

export const NavBar: React.FC<NavBarProps> = ({ dispatch, onSetQsPage, page, user }) => {
  const authLinks = (
    <>
      <NavStateLink
        text="Projects"
        actions={[{ type: AppActionTypes.changePage, payload: 'projects' }]}
        dispatch={dispatch}
        page={page}
        onSetQsPage={onSetQsPage}
        px={3}
        size={'1.2rem'}
      />

      {user?.self !== 'guest' && (
        <NavStateLink
          text={`${user?.givenName} ${user?.familyName}`}
          actions={[{ type: AppActionTypes.changePage, payload: 'profile' }]}
          dispatch={dispatch}
          page={page}
          onSetQsPage={onSetQsPage}
          px={3}
          size={'1.2rem'}
        />
      )}

      <NavStateLinkIcon
        text={<FontAwesomeIcon className="mr-2" icon="sign-out-alt" />}
        actions={[
          { type: AuthActionTypes.logOut, payload: {} },
          { type: AppActionTypes.changePage, payload: 'home' },
        ]}
        dispatch={dispatch}
        page={page}
        onSetQsPage={onSetQsPage}
        px={3}
        size={'1.2rem'}
      />
    </>
  );

  const guestLinks = (
    <>
      <NavStateLink
        actions={[{ type: AppActionTypes.setModal, payload: 'login' }]}
        dispatch={dispatch}
        page={page}
        px={2}
        size="1rem"
        text="Login"
        onSetQsPage={(string): void => {
          console.log(string);
        }}
      />
      <NavStateLink
        actions={[{ type: AppActionTypes.setModal, payload: 'register' }]}
        dispatch={dispatch}
        page={page}
        px={2}
        size="1rem"
        text="Register"
        onSetQsPage={(string): void => {
          console.log(string);
        }}
      />
    </>
  );

  return (
    <nav className="py-3 px-2 d-flex flex-row bg-light justify-content-between align-items-center shadow">
      <a className="d-flex flex-row text-decoration-none" href={'/'}>
        <div className="d-flex align-items-end">
          <img src={logo} alt="" height={'56rem'} />
          <h1
            className="font-logo2 mb-0"
            style={{ lineHeight: '2.2rem', fontSize: '3rem', color: '#ff0000', WebkitTextStroke: '2px black' }}
          >
            ERN
          </h1>
          <h1
            className="font-logo mb-0"
            style={{ lineHeight: '2.2rem', fontSize: '3rem', color: '#ff0000', WebkitTextStroke: '2px black' }}
          >
            INATOR
          </h1>
        </div>
      </a>

      <div className="navbar-nav d-flex flex-row text-secondary">{user?.self !== 'guest' ? authLinks : guestLinks}</div>
    </nav>
  );
};
