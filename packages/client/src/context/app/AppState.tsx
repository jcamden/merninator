import { AppActions, AppStateInterface } from '@merninator/types';
import React, { ReactNode } from 'react';
import { Dispatch, createContext } from 'react';
import { useImmerReducer } from 'use-immer';

import { getQueryStringValue } from '../../utils/queryUtils';
import { useQueryString } from '../../utils/utils';
import { appReducer } from './appReducer';

const initialState: AppStateInterface = {
  page: 'home',
  modal: '',
  onSetQsPage: (newValue: string) => {
    console.log(newValue);
  },
};

interface AppStateProps {
  children: ReactNode;
}

export const AppStateContext = createContext<AppStateInterface>(initialState);
export const AppDispatchContext = createContext<Dispatch<AppActions>>(() => undefined);

export const AppState = ({ children }: AppStateProps): JSX.Element => {
  const [qsPage, onSetQsPage] = useQueryString('page', getQueryStringValue('page') ?? initialState.page);
  const [appState, appDispatch] = useImmerReducer(appReducer, {
    ...initialState,
    page: qsPage,
    onSetQsPage: onSetQsPage,
  });

  return (
    <AppDispatchContext.Provider value={appDispatch}>
      <AppStateContext.Provider value={{ ...appState }}>{children}</AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};
