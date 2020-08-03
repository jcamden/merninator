import React from 'react';
import { AuthActions, AppActions } from '@merninator/types';

interface AuthdHomeProps {
  dispatch: (arg0: AuthActions | AppActions) => void;
}

export const AuthdHome: React.FC<AuthdHomeProps> = ({ dispatch }) => {
  return <>Welcome!</>;
};
