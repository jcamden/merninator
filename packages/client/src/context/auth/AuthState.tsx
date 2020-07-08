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
  checkedAuth: false,
};

interface AuthStateProps {
  children: ReactNode;
}

export const AuthStateContext = createContext<LoginState>(initialState);
export const AuthDispatchContext = createContext<Dispatch<LoginActions>>(() => undefined);

export const AuthState = ({ children }: AuthStateProps): JSX.Element => {
  const [state, dispatch] = useImmerReducer(authReducer, initialState);

  useEffect(() => {
    loadUser(dispatch);
  }, []);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={{ ...state }}>{children}</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};
