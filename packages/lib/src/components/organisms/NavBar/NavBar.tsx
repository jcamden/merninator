import React from 'react';

import { NavStateLink } from './NavLink/NavStateLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AuthActions, AuthActionTypes, AppActions, AppActionTypes, AuthStateInterface } from '@merninator/types';

interface NavBarProps {
  dispatch: (arg0: AuthActions | AppActions) => void;
  user: AuthStateInterface['user'];
}

export const NavBar: React.FC<NavBarProps> = ({ dispatch, user }) => {
  const authLinks = (
    <>
      <NavStateLink
        text="Projects"
        actions={[{ type: AppActionTypes.changePage, payload: 'projects' }]}
        dispatch={dispatch}
      />
      <h4 className="mt-1">|</h4>
      {user?.self !== 'guest' && (
        <NavStateLink
          text={`${user?.givenName} ${user?.familyName}`}
          actions={[{ type: AppActionTypes.changePage, payload: 'profile' }]}
          dispatch={dispatch}
        />
      )}
      <h4 className="mt-1">|</h4>
      <NavStateLink
        text={<FontAwesomeIcon className="mr-2" icon="sign-out-alt" />}
        actions={[
          { type: AuthActionTypes.logOut, payload: {} },
          { type: AppActionTypes.changePage, payload: 'home' },
        ]}
        dispatch={dispatch}
      />
    </>
  );

  const guestLinks = (
    <>
      <NavStateLink
        text="Login"
        actions={[{ type: AppActionTypes.changePage, payload: 'login' }]}
        dispatch={dispatch}
      />
      <h4 className="mt-1">|</h4>
      <NavStateLink
        text="Register"
        actions={[{ type: AppActionTypes.changePage, payload: 'register' }]}
        dispatch={dispatch}
      />
    </>
  );

  return (
    <nav className="py-3 px-2 d-flex flex-row bg-primary justify-content-between align-items-center shadow">
      <a className="d-flex flex-row text-decoration-none" href={'/about'}>
        <img className="logo-img ml-2" alt="no ordinary lamp" src={'https://localhost:5000/djinndexLogo.svg'} />
        <h3 className="font-logo pl-1 text-warning">Djinndex</h3>
      </a>

      <div className="navbar-nav d-flex flex-row text-secondary">{user?.self !== 'guest' ? authLinks : guestLinks}</div>
    </nav>
  );
};
