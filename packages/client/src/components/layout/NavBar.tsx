import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { AuthStateContext, AuthDispatchContext } from '../../context/auth/AuthState';

import NavStateLink from './NavLink/NavStateLinkNew';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar: React.FC = () => {
  const { user } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);

  //   const onLogout = () => {
  //     logout();
  //     clearProjects();
  //   };

  const authLinks = (
    <>
      <NavStateLink text="Projects" page={'projects'} />
      <h3 className="mt-1">|</h3>
      {user?._id !== 'guest' && <NavStateLink text={`${user?.givenName} ${user?.familyName}`} page={'profile'} />}
      <h3 className="mt-1">|</h3>
    </>
  );

  const guestLinks = (
    <>
      <NavStateLink text="Login" page="login" />
      <h4 className="mt-1">|</h4>
      <NavStateLink text="Register" page="register" />
    </>
  );

  return (
    <nav className="py-3 px-2 d-flex flex-row bg-primary justify-content-between align-items-center shadow">
      <a className="d-flex flex-row text-decoration-none" href={'/about'}>
        <img className="logo-img ml-2" alt="no ordinary lamp" src={'https://localhost:5000/djinndexLogo.svg'} />
        <h3 className="font-logo pl-1 text-warning">Djinndex</h3>
      </a>

      <div className="navbar-nav d-flex flex-row text-secondary">{user?._id !== 'guest' ? authLinks : guestLinks}</div>
    </nav>
  );
};

// NavBar.propTypes = {
//   title: PropTypes.string.isRequired,
//   logo: PropTypes.object,
// };

// NavBar.defaultProps = {
//   title: 'Djinndex',
// };

export default NavBar;
