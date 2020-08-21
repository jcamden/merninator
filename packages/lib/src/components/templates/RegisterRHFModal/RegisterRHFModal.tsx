import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppActionTypes, AuthActionTypes, AuthStateInterface, FormWithDispatch, IDispatch } from '@merninator/types';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useForm } from 'react-hook-form';

import {isString} from "../../../utils"
import googleLogo from '../../atoms/Google-G-Logo.svg';
import { LoadingLogo } from '../../atoms/LoadingLogo/LoadingLogo';
import { FormFieldWithIcon } from '../../organisms/FormFieldWithIcon/FormFieldWithIcon';
import { ModalSkeleton } from '../../organisms/ModalSkeleton/ModalSkeleton';
import { DummyPage } from '../DummyPage';

interface FormData {
  givenName: string;
  familyName: string;
  email: string;
  password: string;
  password2: string;
}

interface RegisterRHFModalProps {
  dispatch: IDispatch;
  registerUser: FormWithDispatch<FormData>;
  googleClientId: string;
  authLoading: AuthStateInterface['authLoading'];
  authError: AuthStateInterface['authError'];
  user: AuthStateInterface['user'];
  checkedAuth: AuthStateInterface['checkedAuth'];
}

export const RegisterRHFModal: React.FC<RegisterRHFModalProps> = ({
  dispatch,
  registerUser,
  googleClientId,
  authLoading,
  authError,
  user,
  checkedAuth,
}) => {
  useEffect(() => {
    const self = user?.self;
    self !== 'guest' && dispatch({ type: AppActionTypes.changePage, payload: 'home' });
  }, [user, dispatch]);

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
        } catch (err) {
          dispatch({ type: AuthActionTypes.authError, payload: err.response.data.msg });
        }
      })();
      // this is from GoogleLoginResponseOffline
    } else {
      console.log('GOOGLE ERROR:');
      console.log(response);
    }
  };

  const fontAwesomeEye1 = (
    <FontAwesomeIcon
      icon={pw1Visible ? 'eye' : 'eye-slash'}
      className="ml-2 text-secondary"
      onClick={(): void => {
        setPw1Visible(!pw1Visible);
      }}
    />
  );

  const fontAwesomeEye2 = (
    <FontAwesomeIcon
      icon={pw2Visible ? 'eye' : 'eye-slash'}
      className="ml-2 text-secondary"
      onClick={(): void => {
        setPw2Visible(!pw2Visible);
      }}
    />
  );

  const registerElement = (
    <div className="pt-3 pr-5 pb-5 pl-5">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              pattern: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
            })}
          />
        </div>

        <FormFieldWithIcon
          icon={fontAwesomeEye1}
          error={errors.password}
          name={'password'}
          placeholder="password"
          register={register}
          validate={{
            required: true,
            minLength: { value: 6, message: 'minimum of six characters' },
          }}
          visible={pw1Visible}
        />
        {errors.password?.message === 'minimum of six characters' && (
          <div className="alert alert-danger py-1" role="alert">
            {errors.password.message}
          </div>
        )}

        <FormFieldWithIcon
          icon={fontAwesomeEye2}
          error={errors.password2}
          name={'password2'}
          placeholder="confirm password"
          register={register}
          validate={{
            required: true,
            validate: (value): string | undefined => {
              if (value !== watch('password')) {
                return 'passwords do not match';
              }
            },
          }}
          visible={pw2Visible}
        />

        {errors.password2?.message === 'passwords do not match' && (
          <div className="alert alert-danger py-1" role="alert">
            {errors.password2.message}
          </div>
        )}
        {isString(authError) && authError && (
          <div className="alert alert-danger py-1" role="alert">
            {authError}
          </div>
        )}
        <button className="submit form-btn" type="submit" disabled={authLoading}>
          {authLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <GoogleLogin
        clientId={googleClientId}
        render={(renderProps): JSX.Element => (
          <button className="form-btn mt-3" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <img style={{ height: '1rem', marginBottom: '.1rem' }} src={googleLogo} alt="" className="mr-2" />
            Register with Google
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );

  return (
    <>
      <ModalSkeleton dispatch={dispatch}>
        {checkedAuth ? (
          registerElement
        ) : (
          <DummyPage>
            <div className="my-5"></div>
            <LoadingLogo size={10} />
          </DummyPage>
        )}
      </ModalSkeleton>
    </>
  );
};
