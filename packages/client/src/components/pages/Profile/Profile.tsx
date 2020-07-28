import React from 'react';
import { AuthActions } from '../../../context/auth/types';
import { AppActions } from '../../../context/app/types';

interface ProfileProps {
  dispatch: (arg0: AuthActions | AppActions) => void;
}

export const Profile: React.FC<ProfileProps> = ({ dispatch }) => {
  return <div>This is your profile!</div>;
};
