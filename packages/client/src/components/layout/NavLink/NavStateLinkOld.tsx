import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AppDispatchContext } from '../../../context/app/AppState';
import { Page } from '../../../context/app/types';

interface NavLinkProps {
  text: string | JSX.Element;
  page?: Page;
}

const NavLink: React.FC<NavLinkProps> = ({ text, page }) => {
  const [hovered, setHovered] = useState(false);
  const appDispatch = useContext(AppDispatchContext);
  return (
    <span
      className={`h5 nav-item ${hovered ? 'text-light' : 'text-secondary'} nav-link px-2 mb-0`}
      onClick={(): void => {
        if (page) {
          appDispatch({ type: 'changePage', payload: page });
        }
      }}
      onMouseOver={(): void => setHovered(true)}
      onMouseLeave={(): void => setHovered(false)}
    >
      {text}
    </span>
  );
};

NavLink.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  page: PropTypes.oneOf<Page>(['home', 'login', 'register', 'todos', 'projects', 'editor', 'profile']).isRequired,
};

export default NavLink;
