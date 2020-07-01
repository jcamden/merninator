import { useContext } from 'react';
import { DispatchContext } from '../context/auth/AuthState';
import axios from 'axios';

// Register User
const dispatch = useContext(DispatchContext);

export const register = async (formData: { email: string; password: string }): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('http://localhost:5000/api/users', formData, config);

    dispatch({
      type: 'registerSuccess',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'registerFail',
      payload: err.response.data.msg,
    });
  }
};

// Login User
export const login = async (formData: { email: string; password: string }): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('https://localhost:5000/auth/login', formData, config);

    dispatch({
      type: 'loginSuccess',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'loginFail',
      payload: err.response.data.msg,
    });
  }
};

// Set Auth Token
export const setAuthToken = (token: string): void => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// Load User
export const loadUser = async (): Promise<void> => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:5000/api/auth');
    dispatch({
      type: 'userLoaded',
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'authError', payload: err });
  }
};