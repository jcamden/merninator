import React, { Children, cloneElement, useContext } from 'react';
import { AuthDispatchContext } from './auth/AuthState';
import { AppDispatchContext } from './app/AppState';
import { AuthActions, AuthActionTypes, AppActions, AppActionTypes } from '@merninator/types';

interface DispatchProviderProps {
  // changed from type ReactNode to satisfy TS error:
  // type 'ReactNode' is not assignable to parameter of type 'ReactElement
  children: JSX.Element[];
}

// This not only returns the actionType parameter
// but also a boolean stating whether or not the actionType is an auth action.
// const isAuthActionType = (actionType: string): actionType is AuthActionTypes => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   return Object.values(AuthActionTypes).includes(actionType as any);
// };

// const isAppActionType = (actionType: string): actionType is AppActionTypes => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   return Object.values(AppActionTypes).includes(actionType as any);
// };

const isAuthAction = (action: AuthActions | AppActions): action is AuthActions =>
  // This not only returns the actionType parameter
  // but also a boolean stating whether or not the actionType is an auth action.
  Object.values(AuthActionTypes).includes(action.type as AuthActionTypes);

const isAppAction = (action: AuthActions | AppActions): action is AppActions =>
  Object.values(AppActionTypes).includes(action.type as AppActionTypes);

export const DispatchProvider: React.FC<DispatchProviderProps> = ({ children }) => {
  const authDispatch = useContext(AuthDispatchContext);
  const appDispatch = useContext(AppDispatchContext);

  const dispatch = (action: AuthActions | AppActions): void | Error => {
    // If the action is of the auth action type, dispatch
    return isAuthAction(action)
      ? authDispatch(action)
      : isAppAction(action)
      ? appDispatch(action)
      : new Error('Bad action: there is no reducer which handles that action.');

    // backup checking for actionTypes
    //   return isAuthActionType(action.type) && isAuthAction(action)
    // ? authDispatch(action)
    // : isAppActionType(action) && isAppAction(action)
    // ? appDispatch(action)
    // : // vbad is typo/abbreviation for "very bad"
    //   new Error('vbad action type');
  };

  const childrenWithDispatch = Children.map(children, child => cloneElement(child, { dispatch: dispatch }));

  return <>{childrenWithDispatch}</>;
};
