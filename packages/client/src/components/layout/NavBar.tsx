import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { AuthStateContext } from '../../context/auth/AuthState';

import NavLink from './NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar: React.FC = () => {
  const { user } = useContext(AuthStateContext);

  //   const onLogout = () => {
  //     logout();
  //     clearProjects();
  //   };

  const authLinks = (
    <>
      <NavLink text="Projects" href={'/'} />
      <h3 className="mt-1">|</h3>
      {user && <NavLink text={user.email} href={'/user'} />}
      <h3 className="mt-1">|</h3>
      <NavLink text={<FontAwesomeIcon className="mr-2" icon="sign-out-alt" />} href={'#!'} />
    </>
  );

  const guestLinks = (
    <>
      <NavLink text="Login" href={'/login'} />
      <h4 className="mt-1">|</h4>
      <NavLink text="Register" href={'/register'} />
    </>
  );

  return (
    <nav className="py-3 px-2 d-flex flex-row bg-primary justify-content-between align-items-center shadow">
      <a className="d-flex flex-row text-decoration-none" href={'/about'}>
        <img className="logo-img ml-2" alt="no ordinary lamp" src={'https://localhost:5000/djinndexLogo.svg'} />
        <h3 className="font-logo pl-1 text-warning">Djinndex</h3>
      </a>

      <div className="navbar-nav d-flex flex-row text-secondary">{user ? authLinks : guestLinks}</div>
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
