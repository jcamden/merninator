import React from 'react';
import { AuthActions } from '../../../context/auth/types';
import { AppActions } from '../../../context/app/types';

interface AuthdHomeProps {
  dispatch: (arg0: AuthActions | AppActions) => void;
}

export const AuthdHome: React.FC<AuthdHomeProps> = ({ dispatch }) => {
  return <>Welcome!</>;
};
