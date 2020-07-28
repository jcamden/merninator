import React from 'react';
import { AuthActions, AppActions } from '@merninator/types';

interface UnauthdHomeProps {
  dispatch: (arg0: AuthActions | AppActions) => void;
}

export const UnauthdHome: React.FC<UnauthdHomeProps> = ({ dispatch }) => {
  return <>Welcome!</>;
};
