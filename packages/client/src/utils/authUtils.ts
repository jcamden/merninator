import { Dispatch } from 'react';
import axios from 'axios';
import { AuthActions } from '../context/auth/types';

export const registerUser = async (
  data: { givenName: string; familyName: string; email: string; password: string; password2: string },
  authDispatch: Dispatch<AuthActions>,
): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('https://localhost:5000/auth/register', data, config);

    authDispatch({
      type: 'registerSuccess',
      payload: res.data,
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
): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('https://localhost:5000/auth/login', formData, config);
    authDispatch({
      type: 'loginSuccess',
      payload: res.data,
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
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Load User
export const loadUser = async (authDispatch: Dispatch<AuthActions>): Promise<void> => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get('https://localhost:5000/auth');
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
