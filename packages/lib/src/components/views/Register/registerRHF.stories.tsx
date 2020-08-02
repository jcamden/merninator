import React from 'react';
import { action } from '@storybook/addon-actions';
import { RegisterRHF } from './RegisterRHF';
import { initialUser } from '../../../utils/index';
import { AuthActions, AppActions, AuthActionTypes, AppActionTypes } from '@merninator/types';
import Axios from 'axios';
import { GOOGLE_CLIENT_ID } from '../../../settings';

const registerUserTest = async (
  data: { givenName: string; familyName: string; email: string; password: string; password2: string },
  dispatch: (arg0: AuthActions | AppActions) => void,
): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await Axios.post('https://localhost:5000/auth/register', data, config);

    dispatch({
      type: AuthActionTypes.registerSuccess,
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
  title: 'views',
  component: RegisterRHF,
};

export const registerRHF = () => (
  <RegisterRHF
    dispatch={action('dispatch')}
    registerUser={registerUserTest}
    googleClientId={GOOGLE_CLIENT_ID}
    authLoading={false}
    authError=""
    user={initialUser}
  />
);

export const registerRHFLoading = () => (
  <RegisterRHF
    dispatch={action('dispatch')}
    registerUser={registerUserTest}
    googleClientId={GOOGLE_CLIENT_ID}
    authLoading={true}
    authError=""
    user={initialUser}
  />
);

export const registerRHFAuthError = () => (
  <RegisterRHF
    dispatch={action('dispatch')}
    registerUser={registerUserTest}
    googleClientId={GOOGLE_CLIENT_ID}
    authLoading={false}
    authError="email already registered"
    user={initialUser}
  />
);
