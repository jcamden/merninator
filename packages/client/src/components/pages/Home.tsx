import React, { useContext } from 'react';
import { AuthStateContext } from '../../context/auth/AuthState';
import LoadingLogo from '../layout/LoadingLogo';
import Check from '../auth/Check';

const Home: React.FunctionComponent = () => {
  const { user } = useContext(AuthStateContext);

  return (
    <>
      <Check
        preInitAuth={<LoadingLogo />}
        noUser={<div>No user, punk.</div>}
        component={<div>{`You are logged in! Welcome, ${user?.email}`}!</div>}
      />
    </>
  );
};

export default Home;
