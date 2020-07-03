import React from 'react';

const Spinner: React.FC = ({}) => {
  return (
    <div className="spinner-grow" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
