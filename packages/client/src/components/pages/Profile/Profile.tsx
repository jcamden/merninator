import React from 'react';
import { AuthActions, AppActions } from '@merninator/types';

interface ProfileProps {
  dispatch: (arg0: AuthActions | AppActions) => void;
}

export const Profile: React.FC<ProfileProps> = ({ dispatch }) => {
  return <div>This is your profile!</div>;
};
