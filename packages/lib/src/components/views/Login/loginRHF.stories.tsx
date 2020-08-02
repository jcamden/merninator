import React from 'react';
import { action } from '@storybook/addon-actions';
import { LoginRHF } from './LoginRHF';
import { initialUser } from '../../../utils/index';
import { AuthActionTypes, AppActionTypes, IDispatch } from '@merninator/types';
import Axios from 'axios';
import { GOOGLE_CLIENT_ID } from '../../../settings';

const loginUserTest = async (formData: { email: string; password: string }, dispatch: IDispatch): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await Axios.post('https://localhost:5000/auth/login', formData, config);
    dispatch({
      type: AuthActionTypes.loginSuccess,
      payload: res.data,
    });
    dispatch({
      type: AppActionTypes.changePage,
      payload: 'home',
    });
  } catch (err) {
    dispatch({
      type: AuthActionTypes.authError,
      payload: err.response.data.msg,
    });
  }
};

export default {
  title: 'views/Login',
  component: LoginRHF,
};

export const loginRHF = () => (
  <LoginRHF
    dispatch={action('dispatch')}
    loginUser={loginUserTest}
    googleClientId={GOOGLE_CLIENT_ID}
    authLoading={false}
    authError=""
    user={initialUser}
    checkedAuth={true}
  />
);

export const loginRHFLoading = () => (
  <LoginRHF
    dispatch={action('dispatch')}
    loginUser={loginUserTest}
    googleClientId={GOOGLE_CLIENT_ID}
    authLoading={true}
    authError=""
    user={initialUser}
    checkedAuth={true}
  />
);

export const loginRHFUserNotFound = () => (
  <LoginRHF
    dispatch={action('dispatch')}
    loginUser={loginUserTest}
    googleClientId={GOOGLE_CLIENT_ID}
    authLoading={false}
    authError="user not found"
    user={initialUser}
    checkedAuth={true}
  />
);

export const loginRHFInvalidPW = () => (
  <LoginRHF
    dispatch={action('dispatch')}
    loginUser={loginUserTest}
    googleClientId={GOOGLE_CLIENT_ID}
    authLoading={false}
    authError="invalid password"
    user={initialUser}
    checkedAuth={true}
  />
);

export const loginRHFInitAuthCheck = () => (
  <LoginRHF
    dispatch={action('dispatch')}
    loginUser={loginUserTest}
    googleClientId={GOOGLE_CLIENT_ID}
    authLoading={false}
    authError=""
    user={initialUser}
    checkedAuth={false}
  />
);
