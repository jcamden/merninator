import React, { useContext } from 'react';
import { AuthStateContext, AuthDispatchContext } from '../../../context/auth/AuthState';
import { AppDispatchContext } from '../../../context/app/AppState';
import axios from 'axios';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GOOGLE_CLIENT_ID } from '../../../settings';
import { loginUser } from '../../../utils';
import LoadingLogo from '../../layout/LoadingLogo';
import DummyPage from '../../layout/DummyPage';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

const LoginRHF: React.FC = ({}) => {
  const { authLoading, authError, user, checkedAuth } = useContext(AuthStateContext);
  const self = user?.self;
  const authDispatch = useContext(AuthDispatchContext);
  const appDispatch = useContext(AppDispatchContext);

  const { register, handleSubmit, errors } = useForm<FormData>({ mode: 'onBlur' });

  const onSubmit = (data: FormData): void => {
    try {
      loginUser(data, authDispatch, appDispatch);
    } catch (err) {
      console.log(err);
      authDispatch({ type: 'authError', payload: err.response.data.msg });
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
          appDispatch({
            type: 'changePage',
            payload: 'home',
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
            {self !== 'guest' ? (
              <Redirect to={{ pathname: '/' }} />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="h2 mb-3 font-header">Login</div>
                <div className="form-group d-flex flex-column text-center">
                  <input
                    name="email"
                    type="text"
                    placeholder="email"
                    className={`${(errors.email || authError === 'user not found') && 'inputError'}`}
                    ref={register({
                      required: 'email required',
                      pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                    })}
                  />
                </div>
                {authError === 'user not found' && (
                  <div className="alert alert-danger py-1" role="alert">
                    {authError}
                  </div>
                )}
                <div className="form-group d-flex flex-column text-center">
                  <input
                    name="password"
                    type="password"
                    placeholder="password"
                    autoComplete="new-password"
                    className={`${(errors.password || authError === 'invalid password') && 'inputError'}`}
                    ref={register({
                      required: true,
                      minLength: { value: 6, message: 'minimum of six characters' },
                    })}
                  />
                </div>
                {authError === 'invalid password' && (
                  <div className="alert alert-danger py-1" role="alert">
                    {authError}
                  </div>
                )}
                <button className="submit btn btn-primary btn-block" type="submit" disabled={authLoading}>
                  {authLoading ? 'Logging in...' : 'Login'}
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

LoginRHF.propTypes = {};

export default LoginRHF;
