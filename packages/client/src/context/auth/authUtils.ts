import { useContext } from 'react';
import { DispatchContext } from './AuthState';
import axios from 'axios';

// Register User

const dispatch = useContext(DispatchContext);

export const register = async (formData: { username: string; password: string }): Promise<void> => {
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
export const login = async (formData: { username: string; password: string }): Promise<void> => {
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
