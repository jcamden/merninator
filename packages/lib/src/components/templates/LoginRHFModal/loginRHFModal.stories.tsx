import { AppActionTypes, AuthActionTypes, IDispatch } from '@merninator/types';
import { action } from '@storybook/addon-actions';
import Axios from 'axios';
import React from 'react';

import { GOOGLE_CLIENT_ID } from '../../../../settings';
import { LoginRHFModal } from './LoginRHFModal';

const loginUserTest = async (formData: { email: string; password: string }, dispatch: IDispatch): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await Axios.post(process.env.REACT_APP_SERVER + '/auth/login', formData, config);
    dispatch({
      type: AuthActionTypes.loginSuccess,
      payload: res.data,
    });
    dispatch({
      type: AppActionTypes.setModal,
      payload: '',
    });
  } catch (err) {
    dispatch({
      type: AuthActionTypes.authError,
      payload: err.response.data.msg,
    });
  }
};

export default {
  title: 'templates/LoginRHFModal',
  component: LoginRHFModal,
};

export const loginRHFModal = () => (
  <LoginRHFModal
    dispatch={action('dispatch')}
    loginUser={loginUserTest}
    googleClientId={GOOGLE_CLIENT_ID}
    authLoading={false}
    authError=""
    checkedAuth={true}
  />
);

export const LoginRHFModalLoading = () => (
  <LoginRHFModal
    dispatch={action('dispatch')}
    loginUser={loginUserTest}
    googleClientId={GOOGLE_CLIENT_ID}
    authLoading={true}
    authError=""
    checkedAuth={true}
  />
);

export const LoginRHFModalUserNotFound = () => (
  <LoginRHFModal
    dispatch={action('dispatch')}
    loginUser={loginUserTest}
    googleClientId={GOOGLE_CLIENT_ID}
    authLoading={false}
    authError="user not found"
    checkedAuth={true}
  />
);

export const LoginRHFModalInvalidPW = () => (
  <LoginRHFModal
    dispatch={action('dispatch')}
    loginUser={loginUserTest}
    googleClientId={GOOGLE_CLIENT_ID}
    authLoading={false}
    authError="invalid password"
    checkedAuth={true}
  />
);

export const LoginRHFModalInitAuthCheck = () => (
  <LoginRHFModal
    dispatch={action('dispatch')}
    loginUser={loginUserTest}
    googleClientId={GOOGLE_CLIENT_ID}
    authLoading={false}
    authError=""
    checkedAuth={false}
  />
);
