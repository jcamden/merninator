import React, { ReactNode, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import authReducer from './authReducer';
import { createContext, Dispatch } from 'react';
import { AuthStateInterface, AuthActions } from './types';
import { loadUser } from '../../utils/authUtils';

// really todos belongs in a separate context
// and it should be informed by a GET request
// but eh, just for demo porpoises:

const initialState: AuthStateInterface = {
  user: {
    _id: 'guest',
    email: 'guest',
    givenName: 'guest',
    familyName: 'guest',
  },
  authError: '',
  checkedAuth: false,
  authLoading: true,
};

interface AuthStateProps {
  children: ReactNode;
}

export const AuthStateContext = createContext<AuthStateInterface>(initialState);
export const AuthDispatchContext = createContext<Dispatch<AuthActions>>(() => undefined);

export const AuthState = ({ children }: AuthStateProps): JSX.Element => {
  const [authState, authDispatch] = useImmerReducer(authReducer, initialState);

  useEffect(() => {
    loadUser(authDispatch);
  }, []);

  return (
    <AuthDispatchContext.Provider value={authDispatch}>
      <AuthStateContext.Provider value={{ ...authState }}>{children}</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};
