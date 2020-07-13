import React, { useContext, useState } from 'react';
import { AuthStateContext, AuthDispatchContext } from '../../../context/auth/AuthState';
import axios from 'axios';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GOOGLE_CLIENT_ID } from '../../../settings';
import { registerUser } from '../../../utils';
import LoadingLogo from '../../layout/LoadingLogo';
import DummyPage from '../../layout/DummyPage';

const Login: React.FC = ({}) => {
  const { authLoading, authError, user, checkedAuth } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);

  const [fields, setFields] = useState({
    givenName: '',
    familyName: '',
    email: '',
    password: '',
    password2: '',
  });

  const { givenName, familyName, email, password, password2 } = fields;

  const onChange = (e: React.FormEvent<HTMLInputElement>): void =>
    setFields({ ...fields, [e.currentTarget.name]: e.currentTarget.value });

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (givenName === '' || familyName === '' || email === '' || password === '') {
      console.log('hello');
      authDispatch({
        type: 'authError',
        payload: 'Missing fields :(',
      });
    } else if (password !== password2) {
      authDispatch({
        type: 'authError',
        payload: 'Passwords do not match :(',
      });
    } else {
      try {
        registerUser({ givenName, familyName, email, password, password2 }, authDispatch);
        // authDispatch({ type: 'success' });
      } catch (err) {
        authDispatch({ type: 'authError', payload: err.response.data.msg });
      }
    }
  };

  // This totally blows, but I lied about these type to stop Typescript from complaining that it doesn't have a tokenID.
  interface GoogleLoginResponseOfflineCheat extends GoogleLoginResponseOffline {
    tokenId?: string;
  }
  interface GoogleLoginResponseCheat extends GoogleLoginResponse {
    code?: string;
  }

  // Also, I could not kick this out into a separate file
  // because passing in authDispatch as a param fails typecheck from react-google-login
  const responseGoogle = (response: GoogleLoginResponseCheat | GoogleLoginResponseOfflineCheat): void => {
    // this is from GoogleLoginResponse
    if (response.tokenId) {
      try {
        // self-invoking arrow function so I can use async await
        (async (): Promise<void> => {
          const res = await axios.get('https://localhost:5000/auth/google', {
            params: {
              idToken: response.tokenId,
            },
          });

          authDispatch({
            type: 'loginSuccess',
            payload: res.data,
          });
        })();
      } catch (err) {
        authDispatch({ type: 'authError', payload: err.response.data.msg });
      }
      // this is from GoogleLoginResponseOffline
    } else {
      console.log(response.code);
    }
  };

  const loginElement = (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col d-flex flex-column text-center">
          <div className="card pr-5 pb-5 pl-5 pt-4 mt-5 border shadow">
            {user ? (
              <>
                <h1>Welcome {user.givenName}!</h1>
                <button className="btn btn-primary" onClick={(): void => authDispatch({ type: 'logOut' })}>
                  Log Out
                </button>
              </>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="h2 mb-3 font-header">Register</div>
                <div className="form-group d-flex flex-column text-center">
                  <input
                    name="givenName"
                    type="text"
                    placeholder="given name"
                    value={givenName}
                    onChange={(e): void => onChange(e)}
                  />
                </div>
                <div className="form-group d-flex flex-column text-center">
                  <input
                    name="familyName"
                    type="text"
                    placeholder="family name"
                    value={familyName}
                    onChange={(e): void => onChange(e)}
                  />
                </div>
                <div className="form-group d-flex flex-column text-center">
                  <input
                    name="email"
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e): void => onChange(e)}
                  />
                </div>
                <div className="form-group d-flex flex-column text-center">
                  <input
                    name="password"
                    type="password"
                    placeholder="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e): void => onChange(e)}
                  />
                </div>
                <div className="form-group d-flex flex-column text-center">
                  <input
                    name="password2"
                    type="password"
                    placeholder="confirm password"
                    autoComplete="new-password"
                    value={password2}
                    onChange={(e): void => onChange(e)}
                  />
                </div>
                {authError && (
                  <div className="alert alert-danger" role="alert">
                    {authError}
                  </div>
                )}
                <button className="submit btn btn-primary btn-block" type="submit" disabled={authLoading}>
                  {authLoading ? 'Registering...' : 'Register'}
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
                      Register with Google
                    </button>
                  )}
                  buttonText="Register with Google"
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

  return (
    <>
      {checkedAuth ? (
        loginElement
      ) : (
        <DummyPage>
          <div className="my-5"></div>
          <LoadingLogo size={10} />
        </DummyPage>
      )}
    </>
  );
};

Login.propTypes = {};

export default Login;