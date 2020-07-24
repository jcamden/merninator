import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthStateContext } from '../../../../context/auth/AuthState';
import { LoginRHF } from './LoginRHF';
import { DummyPage } from '../../templates/DummyPage/DummyPage';
import { LoadingLogo } from '../../atoms/LoadingLogo/LoadingLogo';

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const { checkedAuth, user } = useContext(AuthStateContext);
  const self = user?.self;
  return (
    <>
      {checkedAuth ? (
        <DummyPage>
          <div className="card pr-5 pb-5 pl-5 pt-4 mt-5 border shadow">
            {self !== 'guest' ? <Redirect to={{ pathname: '/' }} /> : <LoginRHF />}
          </div>
        </DummyPage>
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
