import React, { useContext } from 'react';
import { AuthStateContext } from '../../context/auth/AuthState';

import NavStateLink from './NavLink/NavStateLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar: React.FC = () => {
  const { user } = useContext(AuthStateContext);

  const authLinks = (
    <>
      <NavStateLink text="Projects" appAction={{ type: 'changePage', payload: 'projects' }} />
      <h3 className="mt-1">|</h3>
      {user?.self !== 'guest' && (
        <NavStateLink
          text={`${user?.givenName} ${user?.familyName}`}
          appAction={{ type: 'changePage', payload: 'profile' }}
        />
      )}
      <h3 className="mt-1">|</h3>
      <NavStateLink text={<FontAwesomeIcon className="mr-2" icon="sign-out-alt" />} authAction={{ type: 'logOut' }} />
    </>
  );

  const guestLinks = (
    <>
      <NavStateLink text="Login" appAction={{ type: 'changePage', payload: 'login' }} />
      <h4 className="mt-1">|</h4>
      <NavStateLink text="Register" appAction={{ type: 'changePage', payload: 'register' }} />
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

export default NavBar;
