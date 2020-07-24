import React from 'react';
import { DummyPage } from '../../../templates/DummyPage/DummyPage';
import { LoadingLogo } from '../../../atoms/LoadingLogo/LoadingLogo';

export const LoginUncheckedAuth: React.FC = () => {
  return (
    <DummyPage>
      <div className="my-5"></div>
      <LoadingLogo size={10} />
    </DummyPage>
  );
};
