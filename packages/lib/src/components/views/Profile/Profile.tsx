import { AppActions, AuthActions } from '@merninator/types';
import React from 'react';

interface ProfileProps {
  dispatch: (arg0: AuthActions | AppActions) => void;
}

export const Profile: React.FC<ProfileProps> = ({}) => {
  return <div>This is your profile!</div>;
};
