import React, { useContext } from 'react';
import { StateContext, DispatchContext } from '../../context/auth/AuthState';
import axios from 'axios';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GOOGLE_CLIENT_ID } from '../../settings';

const Login: React.FC = ({}) => {
  const { email, password, loading, error, user } = useContext(StateContext);
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

  // this totally blows, but I lied about this type to stop Typescript from complaining that it doesn't have a tokenID.
  // I don't know how to do this correctly.
  interface GoogleLoginResponseOfflineCheat extends GoogleLoginResponseOffline {
    tokenId?: string;
  }

  interface GoogleLoginResponseCheat extends GoogleLoginResponse {
    code?: string;
  }

  const responseGoogle = (response: GoogleLoginResponseCheat | GoogleLoginResponseOfflineCheat): void => {
    // this is from GoogleLoginResponse
    if (response.tokenId) {
      try {
        // self-invoking arrow function so I can use async await
        (async (): Promise<void> => {
          console.log('HERE!');

          const res = await axios.get('https://localhost:5000/auth/google', {
            params: {
              idToken: response.tokenId,
            },
          });
          dispatch({
            type: 'googleLoginSuccess',
            payload: { user: res.data.user },
          });
        })();
      } catch (error) {
        console.log(error);
      }
      // this is from GoogleLoginResponseOffline
    } else {
      console.log(response.code);
    }
  };

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
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col d-flex flex-column text-center">
          <div className="card pr-5 pb-5 pl-5 pt-4 mt-5 border shadow">
            {user ? (
              <>
                <h1>Welcome {user.email}!</h1>
                <button className="btn btn-primary" onClick={(): void => dispatch({ type: 'logOut' })}>
                  Log Out
                </button>
              </>
            ) : (
              <form onSubmit={onSubmit}>
                {/* {error && <p className="error">{error}</p>} */}
                <div className="h2 mb-3">Login</div>

                <div className="form-group d-flex flex-column text-center">
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

                <div className="form-group d-flex flex-column text-center">
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

                <button className="submit btn btn-primary btn-block" type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  render={(renderProps): JSX.Element => (
                    <button
                      className="btn btn-danger btn-block mt-3"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <FontAwesomeIcon icon={['fab', 'google']} className="mr-2" />
                      Login with Google
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                {/* We're gonna want to show this if the login was with Google. OnLogoutSuccess from Google token, perform logout from state. 
                <GoogleLogout
              clientId="799766289642-p9oii4nesmg5v7fiq06so41mrdgtjkdl.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={logout}
            ></GoogleLogout> */}
              </form>
            )}
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
