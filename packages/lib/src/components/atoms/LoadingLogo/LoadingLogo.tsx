import React from 'react';

interface LoadingLogoProps {
  size?: number;
}

export const LoadingLogo: React.FC<LoadingLogoProps> = ({ size }) => {
  return (
    <img
      style={{ height: `${size}em` }}
      className="logo-img ml-2"
      alt=""
      src={'https://localhost:5000/djinndexLogo.svg'}
    />
  );
};
