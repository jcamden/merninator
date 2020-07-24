import React, { useContext } from 'react';
import { AuthStateContext } from '../../../../context/auth/AuthState';
import { LoginCheckdAuth } from './LoginCheckedAuth/LoginCheckdAuth';
import { ensureType } from '../../../../utils/ensureType';
import { LoginUncheckedAuth } from './LoginUncheckedAuth/LoginUncheckedAuth';

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const { checkedAuth, user } = useContext(AuthStateContext);
  // so that LoginCheckAuth self prop doesn't have to include | undefined
  const self = ensureType(user?.self, '');

  const { authLoading, authError } = useContext(AuthStateContext);

  return (
    <>
      {checkedAuth ? (
        <LoginCheckdAuth self={self} authError={authError} authLoading={authLoading} />
      ) : (
        <LoginUncheckedAuth />
      )}
    </>
  );
};

Login.propTypes = {};
