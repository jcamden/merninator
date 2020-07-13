import React, { useState } from 'react';
import PropTypes from 'prop-types';

interface NavLinkProps {
  text: string | JSX.Element;
  href?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ text, href, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      className={`h5 nav-item ${hovered ? 'text-light' : 'text-secondary'} nav-link px-2 mb-0`}
      href={href}
      onClick={onClick}
      onMouseOver={(): void => setHovered(true)}
      onMouseLeave={(): void => setHovered(false)}
    >
      {text}
    </a>
  );
};

NavLink.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default NavLink;
