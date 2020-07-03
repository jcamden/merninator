import React, { useContext } from 'react';
import { StateContext, DispatchContext } from '../../context/auth/AuthState';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

const responseGoogle = response => {
  console.log(response.profileObj.email);
};

const AuthTest: React.FC = ({}) => {
  const { email, password, loading, error, user } = useContext(StateContext);

  console.log(user);

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

  const loginWithGoogle = async (): Promise<void> => {
    //  try {
    const res = await axios.get('https://localhost:5000/auth/google');
    console.log(res.data);
    //   dispatch({
    //     type: 'loginSuccess',
    //     payload: res.data,
    //   });
    // } catch (err) {
    //   dispatch({
    //     type: 'loginFail',
    //     payload: err.response.data.msg,
    //   });
    // }
  };

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
            <button className="submit btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
            <button className="submit btn btn-danger" disabled={loading} onClick={() => loginWithGoogle()}>
              Login with Google
            </button>
            <GoogleLogin
              clientId="799766289642-p9oii4nesmg5v7fiq06so41mrdgtjkdl.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            ,
          </form>
        )}
      </div>
    </div>
  );
};

AuthTest.propTypes = {};

export default AuthTest;
