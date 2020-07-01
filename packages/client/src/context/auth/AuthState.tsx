import React, { ReactNode } from 'react';
import { useImmerReducer } from 'use-immer';
import authReducer from './authReducer';
import { createContext, Dispatch } from 'react';
import { LoginState, LoginActions } from './types';

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
    title: 'oraganize the cat',
    completed: false,
  },
];

const initialState: LoginState = {
  token: localStorage.getItem('token'),
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

export const StateContext = createContext<LoginState>(initialState);
export const DispatchContext = createContext<Dispatch<LoginActions>>(() => null);

export const AuthState = ({ children }: AuthStateProps): JSX.Element => {
  const [state, dispatch] = useImmerReducer(authReducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={{ ...state }}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
