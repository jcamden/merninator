import React from 'react';
import { RegisterRHF } from './RegisterRHF';
import { user, voidMaker, voidPromiseMaker } from '../../../utils/index';

export default {
  title: 'atoms',
  component: RegisterRHF,
};

export const registerRHF = () => (
  <RegisterRHF
    dispatch={voidMaker}
    registerUser={voidPromiseMaker}
    googleClientId="monkey"
    authLoading={false}
    authError=""
    user={user}
  />
);
