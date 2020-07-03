import React, { useContext } from 'react';
import { StateContext, DispatchContext } from '../../context/auth/AuthState';
import axios from 'axios';

const AuthTest: React.FC = ({ }) => {
  const { email, password, isLoading, error, user } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  // const register = async (formData: { email: string; password: string }): Promise<void> => {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   try {
  //     const res = await axios.post('http://localhost:5000/api/users', formData, config);

  //     dispatch({
  //       type: 'registerSuccess',
  //       payload: res.data,
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: 'registerFail',
  //       payload: err.response.data.msg,
  //     });
  //   }
  // };

  // Login User
  const login = async (formData: { email: string; password: string }): Promise<void> => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('https://localhost:5000/auth/login', formData, config);
      console.log(res.data);
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
  // const setAuthToken = (token: string): void => {
  //   if (token) {
  //     axios.defaults.headers.common['x-auth-token'] = token;
  //   } else {
  //     delete axios.defaults.headers.common['x-auth-token'];
  //   }
  // };

  // Load User
  // const loadUser = async (): Promise<void> => {
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //   }
  //   try {
  //     const res = await axios.get('http://localhost:5000/api/auth');
  //     dispatch({
  //       type: 'userLoaded',
  //       payload: res.data,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     dispatch({ type: 'authError', payload: err });
  //   }
  // };

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      await login({ email, password });
      dispatch({ type: 'success' });
    } catch (error) {
      dispatch({ type: 'error' });
    }
  };
  return (
    <div className="container text-center p-3">
      <div className="card p-5">
        {user ? (
          <>
            <h1>Welcome {email}!</h1>
            <button className="btn btn-primary" onClick={(): void => dispatch({ type: 'logOut' })}>
              Log Out
            </button>
          </>
        ) : (
            <form onSubmit={onSubmit}>
              {error && <p className="error">{error}</p>}
              <p>Please Login!</p>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e): void =>
                    dispatch({
                      type: 'field',
                      fieldName: 'email',
                      payload: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e): void =>
                    dispatch({
                      type: 'field',
                      fieldName: 'password',
                      payload: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <button className="submit btn btn-primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          )}
      </div>
    </div>
  );
};

AuthTest.propTypes = {};

export default AuthTest;
