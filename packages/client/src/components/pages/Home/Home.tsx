import React from 'react';
import LoadingLogo from '../../layout/LoadingLogo';
import Check from '../../auth/Check';

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Check preInitAuth={<LoadingLogo />} noUser={<div>No user, punk.</div>} component={<div>Welcome!</div>} />
    </>
  );
};

export default Home;
