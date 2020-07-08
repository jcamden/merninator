import React from 'react';
import PropTypes from 'prop-types';

interface LoadingLogoProps {
  size?: number;
}

const LoadingLogo: React.FC<LoadingLogoProps> = ({ size }) => {
  return (
    <img
      style={{ height: `${size}em` }}
      className="logo-img ml-2"
      alt="no ordinary lamp"
      src={'https://localhost:5000/djinndexLogo.svg'}
    />
  );
};

LoadingLogo.propTypes = {
  size: PropTypes.number,
};

export default LoadingLogo;
