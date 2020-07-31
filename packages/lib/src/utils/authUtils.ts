import { Dispatch } from 'react';
import Axios from 'Axios';
import { AuthActions } from '../context/auth/types';
import { AppActions } from '../context/app/types';

export const registerUser = async (
  data: { givenName: string; familyName: string; email: string; password: string; password2: string },
  authDispatch: Dispatch<AuthActions>,
  appDispatch: Dispatch<AppActions>,
): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await Axios.post('https://localhost:5000/auth/register', data, config);

    authDispatch({
      type: 'registerSuccess',
      payload: res.data,
    });
    appDispatch({
      type: 'changePage',
      payload: 'home',
    });
  } catch (err) {
    authDispatch({
      type: 'authError',
      payload: err.response.data.msg,
    });
  }
};

// Login User
export const loginUser = async (
  formData: { email: string; password: string },
  authDispatch: Dispatch<AuthActions>,
  appDispatch: Dispatch<AppActions>,
): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await Axios.post('https://localhost:5000/auth/login', formData, config);
    authDispatch({
      type: 'loginSuccess',
      payload: res.data,
    });
    appDispatch({
      type: 'changePage',
      payload: 'home',
    });
  } catch (err) {
    authDispatch({
      type: 'authError',
      payload: err.response.data.msg,
    });
  }
};

// Set Auth Token
export const setAuthToken = (token: string): void => {
  if (token) {
    Axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete Axios.defaults.headers.common['Authorization'];
  }
};

// Load User
export const loadUser = async (authDispatch: Dispatch<AuthActions>): Promise<void> => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      const res = await Axios.get('https://localhost:5000/auth');
      console.log(res.data.user);
      authDispatch({
        type: 'userLoaded',
        payload: {
          user: res.data.user,
        },
      });
    } catch (err) {
      console.log('loadUser had the following error:');
      console.log(err);
      authDispatch({ type: 'authError', payload: err.response.data.msg });
    }
  } else {
    authDispatch({ type: 'noToken' });
  }
};
