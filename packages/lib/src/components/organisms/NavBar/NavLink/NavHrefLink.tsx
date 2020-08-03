import React, { useState } from 'react';

interface NavLinkProps {
  text: string | JSX.Element;
  href?: string;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ text, href, onClick }) => {
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
