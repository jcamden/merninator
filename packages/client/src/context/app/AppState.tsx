import React, { ReactNode } from 'react';
import { useImmerReducer } from 'use-immer';
import { appReducer } from './appReducer';
import { createContext, Dispatch } from 'react';
import { AppStateInterface, AppActions } from './types';

const initialState: AppStateInterface = {
  page: 'home',
};

interface AppStateProps {
  children: ReactNode;
}

export const AppStateContext = createContext<AppStateInterface>(initialState);
export const AppDispatchContext = createContext<Dispatch<AppActions>>(() => undefined);

export const AppState = ({ children }: AppStateProps): JSX.Element => {
  const [appState, appDispatch] = useImmerReducer(appReducer, initialState);

  return (
    <AppDispatchContext.Provider value={appDispatch}>
      <AppStateContext.Provider value={{ ...appState }}>{children}</AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};
