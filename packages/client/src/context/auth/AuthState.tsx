import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useImmerReducer } from 'use-immer';
import { DispatchContext, StateContext } from './authContext';
import authReducer from './authReducer';
import { LoginState } from './types';

const todos = [
  {
    title: 'milk the fish',
    completed: true,
  },
  {
    title: 'clean the cheese',
    completed: false,
  },
  {
    title: 'oragnize the cat',
    completed: false,
  },
];

const initialState: LoginState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
  variant: 'login',
  todos,
};

interface AuthStateProps {
  children: ReactNode;
}

export default function Authstate({ children }: AuthStateProps): JSX.Element {
  const [state, dispatch] = useImmerReducer(authReducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

Authstate.propTypes = {
  children: PropTypes.node,
};
