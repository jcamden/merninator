import React, { ReactNode } from 'react';
interface DummyPageProps {
  children: ReactNode;
}

// I made this to present a LoadingLogo.
// Could have other uses.

export const DummyPage: React.FC<DummyPageProps> = ({ children }) => {
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
