import { AuthActions, AuthStateInterface } from '@merninator/types';
import React, { ReactNode, useEffect } from 'react';
import { Dispatch, createContext } from 'react';
import { useImmerReducer } from 'use-immer';

import { loadUserAuthDispatch } from '../../utils/authUtils';
import { authReducer } from './authReducer';

// really todos belongs in a separate context
// and it should be informed by a GET request
// but eh, just for demo porpoises:

const initialState: AuthStateInterface = {
  user: {
    self: 'guest',
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
    loadUserAuthDispatch(authDispatch);
  }, []);

  return (
    <AuthDispatchContext.Provider value={authDispatch}>
      <AuthStateContext.Provider value={{ ...authState }}>{children}</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};
