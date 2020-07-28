import React from 'react';
import { StateRouter } from './StateRouter';
import { DispatchProviderSingleChild } from '../../context/DispatchProviderSingleChild';

export const DispatchWrappedStateRouter: React.FC = () => {
  return (
    <DispatchProviderSingleChild>
      <StateRouter
        dispatch={(): void => {
          return;
        }}
      />
    </DispatchProviderSingleChild>
  );
};
