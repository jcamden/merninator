import React, { cloneElement, useContext } from 'react';
import { AuthDispatchContext } from './auth/AuthState';
import { AuthActions, AuthActionTypes } from './auth/types';
import { AppActions, AppActionTypes } from './app/types';
import { AppDispatchContext } from './app/AppState';

interface DispatchProviderSingleChildProps {
  // changed from type ReactNode to satisfy TS error:
  // type 'ReactNode' is not assignable to parameter of type 'ReactElement
  children: JSX.Element;
}
const isAuthAction = (action: AuthActions | AppActions): action is AuthActions =>
  // This not only returns the actionType parameter
  // but also a boolean stating whether or not the actionType is an auth action.
  Object.values(AuthActionTypes).includes(action.type as AuthActionTypes);
const isAppAction = (action: AuthActions | AppActions): action is AppActions =>
  Object.values(AppActionTypes).includes(action.type as AppActionTypes);

export const DispatchProviderSingleChild: React.FC<DispatchProviderSingleChildProps> = ({ children }) => {
  const authDispatch = useContext(AuthDispatchContext);
  const appDispatch = useContext(AppDispatchContext);

  const dispatch = (action: AuthActions | AppActions): void | Error => {
    // If the action is of the auth action type, dispatch
    return isAuthAction(action)
      ? authDispatch(action)
      : isAppAction(action)
      ? appDispatch(action)
      : new Error('Bad action: there is no reducer which handles that action.');
  };

  const childrenWithDispatch = cloneElement(children, { dispatch: dispatch });

  return <>{childrenWithDispatch}</>;
};
