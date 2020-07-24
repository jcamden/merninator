import React from 'react';
import { LoginRHF } from '../LoginCheckedAuth/LoginRHF';

export default {
  title: 'views/login',
  component: LoginRHF,
};

export const loginRHF = () => {
  return <LoginRHF authError={''} authLoading={false} />;
};
