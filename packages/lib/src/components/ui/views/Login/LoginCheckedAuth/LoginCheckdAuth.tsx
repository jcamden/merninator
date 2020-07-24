import React from 'react';
import { Redirect } from 'react-router-dom';
import { LoginRHF } from './LoginRHF';
import { DummyPage } from '../../../templates/DummyPage/DummyPage';

interface LoginCheckdAuthProps {
  self: string;
  authError: string;
  authLoading: boolean;
}

export const LoginCheckdAuth: React.FC<LoginCheckdAuthProps> = ({ self, authError, authLoading }) => {
  return (
    <DummyPage>
      <div className="card pr-5 pb-5 pl-5 pt-4 mt-5 border shadow">
        {self !== 'guest' ? (
          <Redirect to={{ pathname: '/' }} />
        ) : (
          <LoginRHF authError={authError} authLoading={authLoading} />
        )}
      </div>
    </DummyPage>
  );
};
