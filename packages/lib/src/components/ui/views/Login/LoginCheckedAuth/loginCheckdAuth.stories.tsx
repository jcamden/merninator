import React from 'react';
import { LoginCheckdAuth } from './LoginCheckdAuth';

export default {
  title: 'views/Login/CheckdAuth',
  component: LoginCheckdAuth,
};

export const defaultState = () => <LoginCheckdAuth self="guest" authLoading={false} authError="" />;

export const loading = () => <LoginCheckdAuth self="guest" authLoading={true} authError="" />;

export const errorEmail = () => <LoginCheckdAuth self="guest" authLoading={false} authError="user not found" />;

export const errorPassword = () => <LoginCheckdAuth self="guest" authLoading={false} authError="invalid password" />;
