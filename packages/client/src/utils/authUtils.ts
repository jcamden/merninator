import { AppActionTypes, AppActions, AuthActionTypes, AuthActions } from '@merninator/types';
import Axios from 'axios';
import { Dispatch } from 'react';

export const registerUser = async (
  data: { givenName: string; familyName: string; email: string; password: string; password2: string },
  dispatch: (arg0: AuthActions | AppActions) => void,
): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await Axios.post(process.env.REACT_APP_SERVER + '/auth/register', data, config);

    dispatch({
      type: AuthActionTypes.registerSuccess,
      payload: res.data,
    });
    dispatch({
      type: AppActionTypes.changePage,
      payload: 'writing',
    });
  } catch (err) {
    dispatch({
      type: AuthActionTypes.authError,
      payload: err.response.data.msg,
    });
  }
};

export const registerUserModal = async (
  data: { givenName: string; familyName: string; email: string; password: string; password2: string },
  dispatch: (arg0: AuthActions | AppActions) => void,
): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await Axios.post(process.env.REACT_APP_SERVER + '/auth/register', data, config);

    dispatch({
      type: AuthActionTypes.registerSuccess,
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

// Login User
export const loginUser = async (
  formData: { email: string; password: string },
  dispatch: (arg0: AuthActions | AppActions) => void,
): Promise<void> => {
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
      type: AppActionTypes.changePage,
      payload: 'writing',
    });
  } catch (err) {
    dispatch({
      type: AuthActionTypes.authError,
      payload: err.response.data.msg,
    });
  }
};

export const loginUserModal = async (
  formData: { email: string; password: string },
  dispatch: (arg0: AuthActions | AppActions) => void,
): Promise<void> => {
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

// Set Auth Token
export const setAuthToken = (token: string): void => {
  if (token) {
    Axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete Axios.defaults.headers.common['Authorization'];
  }
};

// Load User
export const loadUser = async (dispatch: (arg0: AuthActions | AppActions) => void): Promise<void> => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      const res = await Axios.get(process.env.REACT_APP_SERVER + '/auth');
      console.log(res.data.user);
      dispatch({
        type: AuthActionTypes.userLoaded,
        payload: {
          user: res.data.user,
        },
      });
      // Probably need to make this error handling more specific:
      // Is the server offline, or was the token bad, etc.?
    } catch (err) {
      console.log('loadUser had the following error:');
      console.log(err);
      dispatch({ type: AuthActionTypes.authError, payload: err });
    }
  } else {
    dispatch({ type: AuthActionTypes.noToken, payload: {} });
  }
};

// Load User via AuthDispatch
// The generic dispatch is not yet available when initializing the authState
export const loadUserAuthDispatch = async (authDispatch: Dispatch<AuthActions>): Promise<void> => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      console.log(process.env.REACT_APP_SERVER);
      const res = await Axios.get(process.env.REACT_APP_SERVER + '/auth');
      console.log(res.data.user);
      authDispatch({
        type: AuthActionTypes.userLoaded,
        payload: {
          user: res.data.user,
        },
      });
      // Probably need to make this error handling more specific:
      // Is the server offline, or was the token bad, etc.?
    } catch (err) {
      console.log('loadUser had the following error:');
      console.log(err);
      authDispatch({ type: AuthActionTypes.authError, payload: err });
    }
  } else {
    authDispatch({ type: AuthActionTypes.noToken, payload: {} });
  }
};
