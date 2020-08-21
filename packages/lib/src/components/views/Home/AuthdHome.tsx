import { AppActions, AuthActions } from '@merninator/types';
import React from 'react';

interface AuthdHomeProps {
  dispatch: (arg0: AuthActions | AppActions) => void;
}

export const AuthdHome: React.FC<AuthdHomeProps> = ({}) => {
  return <>Welcome!</>;
};
