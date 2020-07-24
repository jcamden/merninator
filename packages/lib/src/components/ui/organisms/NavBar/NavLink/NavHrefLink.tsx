import React, { useState } from 'react';

interface NavHrefLinkProps {
  text: string | JSX.Element;
  href?: string;
  onClick?: () => void;
}

export const NavHrefLink: React.FC<NavHrefLinkProps> = ({ text, href, onClick }) => {
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
