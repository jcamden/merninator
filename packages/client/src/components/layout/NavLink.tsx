import React from 'react';
import PropTypes from 'prop-types';

interface NavLinkProps {
  text: string | JSX.Element;
  href: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ text, href, onClick }) => {
  return (
    <a className="nav-item text-light nav-link px-2" href={href} onClick={onClick}>
      <h5 className="mb-0">{text}</h5>
    </a>
  );
};

NavLink.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default NavLink;
