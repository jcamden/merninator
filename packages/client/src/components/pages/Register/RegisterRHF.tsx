import React, { useContext, useState } from 'react';
import { AuthStateContext } from '../../../context/auth/AuthState';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GOOGLE_CLIENT_ID } from '../../../settings';
import { registerUser } from '../../../utils';
import { Redirect } from 'react-router-dom';
import { AuthActions, AuthActionTypes } from '../../../context/auth/types';
import { AppActions, AppActionTypes } from '../../../context/app/types';

interface FormData {
  givenName: string;
  familyName: string;
  email: string;
  password: string;
  password2: string;
}

interface RegisterRHFProps {
  dispatch: (arg0: AuthActions | AppActions) => void;
}

export const RegisterRHF: React.FC<RegisterRHFProps> = ({ dispatch }) => {
  const { authLoading, authError, user } = useContext(AuthStateContext);
  const self = user?.self;

  const [pw1Visible, setPw1Visible] = useState(false);
  const [pw2Visible, setPw2Visible] = useState(false);

  const { register, handleSubmit, watch, errors } = useForm<FormData>({ mode: 'onBlur' });

  const onSubmit = (data: FormData): void => {
    try {
      registerUser(data, dispatch);
    } catch (err) {
      console.log(err);
      dispatch({ type: AuthActionTypes.authError, payload: err.response.data.msg });
    }
  };

  // This totally blows, but I lied about these type to stop Typescript from complaining that it doesn't have a tokenID.
  interface GoogleLoginResponseOfflineCheat extends GoogleLoginResponseOffline {
    tokenId?: string;
  }
  interface GoogleLoginResponseCheat extends GoogleLoginResponse {
    code?: string;
  }

  // Also, I did not kick this out into a separate file
  // because passing in authDispatch as a param fails typecheck from react-google-login.
  const responseGoogle = (response: GoogleLoginResponseCheat | GoogleLoginResponseOfflineCheat): void => {
    // this is from GoogleLoginResponse
    if (response.tokenId) {
      // self-invoking arrow function so I can use async await
      (async (): Promise<void> => {
        try {
          const res = await axios.get('https://localhost:5000/auth/google', {
            params: {
              idToken: response.tokenId,
            },
          });
          dispatch({
            type: AuthActionTypes.loginSuccess,
            payload: res.data,
          });
          dispatch({
            type: AppActionTypes.changePage,
            payload: 'home',
          });
        } catch (err) {
          dispatch({ type: AuthActionTypes.authError, payload: err.response.data.msg });
        }
      })();
      // this is from GoogleLoginResponseOffline
    } else {
      console.log(response.code);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col d-flex flex-column text-center">
          <div className="card pr-5 pb-5 pl-5 pt-4 mt-5 border shadow">
            {self !== 'guest' ? (
              <Redirect to={{ pathname: '/' }} />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="h2 mb-3 font-header">Register</div>
                <div className="form-group d-flex flex-column text-center">
                  <input
                    name="givenName"
                    type="text"
                    placeholder="given name"
                    className={`${errors.givenName && 'inputError'}`}
                    ref={register({ required: true })}
                  />
                </div>
                <div className="form-group d-flex flex-column text-center">
                  <input
                    name="familyName"
                    type="text"
                    placeholder="family name"
                    className={`${errors.familyName && 'inputError'}`}
                    ref={register({ required: true })}
                  />
                </div>

                <div className="form-group d-flex flex-column text-center">
                  <input
                    name="email"
                    type="text"
                    placeholder="email"
                    className={`${(errors.email || authError) && 'inputError'}`}
                    ref={register({
                      required: 'email required',
                      pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                    })}
                  />
                </div>
                <div className="form-group d-flex flex-column text-center">
                  <div className="px-0 text-left">
                    <input
                      name="password"
                      type={pw1Visible ? 'text' : 'password'}
                      placeholder="password"
                      autoComplete="new-password"
                      className={`${(errors.password || errors.password2?.message === 'passwords do not match') &&
                        'inputError'}`}
                      ref={register({
                        required: true,
                        minLength: { value: 6, message: 'minimum of six characters' },
                      })}
                    />
                    <FontAwesomeIcon
                      icon={pw1Visible ? 'eye' : 'eye-slash'}
                      className="ml-2 text-secondary"
                      onClick={(): void => {
                        setPw1Visible(!pw1Visible);
                      }}
                    />
                  </div>
                </div>
                {errors.password?.message === 'minimum of six characters' && (
                  <div className="alert alert-danger py-1" role="alert">
                    {errors.password.message}
                  </div>
                )}
                <div className="form-group d-flex flex-column text-center">
                  <div className="px-0 text-left">
                    <input
                      name="password2"
                      type={pw2Visible ? 'text' : 'password'}
                      placeholder="confirm password"
                      autoComplete="new-password"
                      className={`p${errors.password2 && 'inputError'}`}
                      ref={register({
                        required: true,
                        validate: value => {
                          if (value !== watch('password')) {
                            return 'passwords do not match';
                          }
                        },
                      })}
                    />
                    <FontAwesomeIcon
                      icon={pw2Visible ? 'eye' : 'eye-slash'}
                      className="ml-2 text-secondary"
                      onClick={(): void => {
                        setPw2Visible(!pw2Visible);
                      }}
                    />
                  </div>
                </div>
                {errors.password2?.message === 'passwords do not match' && (
                  <div className="alert alert-danger py-1" role="alert">
                    {errors.password2.message}
                  </div>
                )}
                {authError && (
                  <div className="alert alert-danger py-1" role="alert">
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
              </form>
            )}
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};
