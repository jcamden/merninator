import React, { ReactNode, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import authReducer from './authReducer';
import { createContext, Dispatch } from 'react';
import { LoginState, LoginActions } from './types';
import { loadUser } from '../../utils/authUtils';

// really todos belongs in a separate context
// and it should be informed by a GET request
// but eh, just for demo porpoises:
const todos = [
  {
    title: 'milk the fish',
    completed: true,
  },
  {
    title: 'read the cheese',
    completed: false,
  },
  {
    title: 'oraganize the cat ninja',
    completed: false,
  },
];

const initialState: LoginState = {
  token: localStorage.getItem('token'),
  email: '',
  password: '',
  loading: true,
  error: '',
  variant: 'login',
  todos,
};

interface AuthStateProps {
  children: ReactNode;
}

export const StateContext = createContext<LoginState>(initialState);
export const DispatchContext = createContext<Dispatch<LoginActions>>(() => undefined);

export const AuthState = ({ children }: AuthStateProps): JSX.Element => {
  const [state, dispatch] = useImmerReducer(authReducer, initialState);

  useEffect(() => {
    console.log('STATE USE EFFECT');
    loadUser(dispatch);
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={{ ...state }}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
