import React, { useContext } from 'react';
import { AuthStateContext } from '../../context/auth/AuthState';

const Home: React.FunctionComponent = () => {
  const { user } = useContext(AuthStateContext);
  return <div>{user ? `Welcome, ${user.email}` : `Log in if you really want to see the good stuff.`}</div>;
};

export default Home;
