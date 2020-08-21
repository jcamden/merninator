import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppActionTypes, AuthActionTypes, AuthStateInterface, FormWithDispatch, IDispatch } from '@merninator/types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import React, { useState } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useForm } from 'react-hook-form';

import { FormButton } from '../../atoms/Buttons/FormButton';
import googleLogo from '../../atoms/Google-G-Logo.svg';
import { LoadingLogo } from '../../atoms/LoadingLogo/LoadingLogo';
import { FormFieldWithIcon } from '../../organisms/FormFieldWithIcon/FormFieldWithIcon';
import { ModalSkeleton } from '../../organisms/ModalSkeleton/ModalSkeleton';
import { DummyPage } from '../DummyPage';

interface FormData {
  email: string;
  password: string;
}

interface LoginRHFModalProps {
  dispatch: IDispatch;
  loginUser: FormWithDispatch<FormData>;
  googleClientId: string;
  authLoading: AuthStateInterface['authLoading'];
  authError: AuthStateInterface['authError'];
  checkedAuth: AuthStateInterface['checkedAuth'];
}

export const LoginRHFModal: React.FC<LoginRHFModalProps> = ({
  dispatch,
  loginUser,
  authLoading,
  authError,
  checkedAuth,
  googleClientId,
}) => {
  const [pwVisible, setPwVisible] = useState(false);
  const { register, handleSubmit, errors } = useForm<FormData>({ mode: 'onBlur' });

  const onSubmit = (data: FormData): void => {
    try {
      loginUser(data, dispatch);
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

  // Also, I could not kick this out into a separate file
  // because passing in authDispatch as a param fails typecheck from react-google-login
  const responseGoogle = (response: GoogleLoginResponseCheat | GoogleLoginResponseOfflineCheat): void => {
    // this is from GoogleLoginResponse
    if (response.tokenId) {
      try {
        // self-invoking arrow function so I can use async await
        (async (): Promise<void> => {
          // thought about replacing Axios with fetch, but honestly, fetch support for query params is crap;
          const res = await Axios.get(process.env.REACT_APP_SERVER + '/auth/google', {
            params: {
              idToken: response.tokenId,
            },
          });
          dispatch({
            type: AuthActionTypes.loginSuccess,
            payload: res.data,
          });
          dispatch({
            type: AppActionTypes.setModal,
            payload: '',
          });
        })();
      } catch (err) {
        dispatch({ type: AuthActionTypes.authError, payload: err.response.data.msg });
      }
      // this is from GoogleLoginResponseOffline
    } else {
      console.log(response.code);
    }
  };

  const fontAwesomeEye = (
    <FontAwesomeIcon
      icon={pwVisible ? 'eye' : 'eye-slash'}
      className="ml-2 text-secondary"
      onClick={(): void => {
        setPwVisible(!pwVisible);
      }}
    />
  );

  const loginElement = (
    <ModalSkeleton dispatch={dispatch}>
      <div className="pt-2 pr-5 pb-5 pl-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group d-flex flex-column text-center">
            <input
              name="email"
              type="text"
              placeholder="email"
              className={`${(errors.email || authError === 'user not found') && 'inputError'}`}
              ref={register({
                required: 'email required',
                pattern: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
              })}
            />
          </div>
          {authError === 'user not found' && (
            <div className="alert alert-danger py-1" role="alert">
              {authError}
            </div>
          )}

          <FormFieldWithIcon
            icon={fontAwesomeEye}
            error={errors.password}
            name={'password'}
            placeholder="password"
            register={register}
            validate={{
              required: true,
              minLength: { value: 6, message: 'minimum of six characters' },
            }}
            visible={pwVisible}
          />
          {authError === 'invalid password' && (
            <div className="alert alert-danger py-1" role="alert">
              {authError}
            </div>
          )}

          <FormButton text="Login" color="grey" disabled={authLoading} />

          {/* <button className="submit btn btn-primary btn-block" type="submit" disabled={authLoading}>
                  {authLoading ? 'Logging in...' : 'Login'}
                </button> */}
          <GoogleLogin
            clientId={googleClientId}
            render={(renderProps): JSX.Element => (
              <button className="form-btn mt-3" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <img src={googleLogo} alt="" style={{ height: '1rem', marginBottom: '.1rem' }} className="mr-2" />
                {/* <FontAwesomeIcon icon={['fab', 'google']} className="mr-2" /> */}
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
      </div>
    </ModalSkeleton>
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
