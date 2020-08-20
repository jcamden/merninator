import React from 'react';

import logo from '../merninator-medium.svg';

interface LoadingLogoProps {
  size?: number;
}

export const LoadingLogo: React.FC<LoadingLogoProps> = ({ size }) => {
  return <img style={{ height: `${size}em` }} className="logo-img ml-2" alt="" src={logo} />;
};
