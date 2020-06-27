import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useImmerReducer } from 'use-immer';
import { DispatchContext, StateContext } from './authContext';
import authReducer from './authReducer';
import { LoginState } from './types';
import { setAuthToken } from '../../utils';
import axios from 'axios';

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

export default function Authstate({ children }: AuthStateProps): JSX.Element {
  const [state, dispatch] = useImmerReducer(authReducer, initialState);

  const loadUser = async (): Promise<void> => {
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
      dispatch({ type: 'authError' });
    }
  };

  // Register User
  const register = async (formData: { username: string; password: string }): Promise<void> => {
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

      loadUser();
    } catch (err) {
      dispatch({
        type: 'registerFail',
        // payload: err.response.data.msg,
      });
    }
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={{ ...state, loadUser, register }}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

Authstate.propTypes = {
  children: PropTypes.node,
};
