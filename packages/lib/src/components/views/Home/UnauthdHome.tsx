import { AppActions, AuthActions } from '@merninator/types';
import React from 'react';

interface UnauthdHomeProps {
  dispatch: (arg0: AuthActions | AppActions) => void;
}

export const UnauthdHome: React.FC<UnauthdHomeProps> = ({ dispatch }) => {
  return <>No user, punk!</>;
};
