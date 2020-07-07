import React, { useContext } from 'react';
import { StateContext, DispatchContext } from '../../context/auth/AuthState';

const Home: React.FunctionComponent = () => {
  const { user } = useContext(StateContext);
  //   const dispatch = useContext(DispatchContext);
  return <div>{user ? `Welcome, ${user.email}` : `Log in if you really want to see the good stuff.`}</div>;
};

export default Home;
