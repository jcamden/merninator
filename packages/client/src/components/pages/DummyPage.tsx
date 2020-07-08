import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

interface DummyPageProps {
  children: ReactNode;
}

const DummyPage: React.FC<DummyPageProps> = ({ children }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col d-flex flex-column text-center">{children}</div>
        <div className="col"></div>
      </div>
    </div>
  );
};

DummyPage.propTypes = { children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired };

export default DummyPage;
