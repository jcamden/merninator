import React from 'react';
import { AuthActions } from '../../../context/auth/types';
import { AppActions } from '../../../context/app/types';

interface UnauthdHomeProps {
  dispatch: (arg0: AuthActions | AppActions) => void;
}

export const UnauthdHome: React.FC<UnauthdHomeProps> = ({ dispatch }) => {
  return <>Welcome!</>;
};
