import React from 'react';
import PropTypes from 'prop-types';

interface SnippetsTestProps {
  test: string;
}

export const SnippetsTest: React.FC<SnippetsTestProps> = ({ test }) => {
  return <div>{test}</div>;
};

SnippetsTest.propTypes = {
  test: PropTypes.string.isRequired,
};
