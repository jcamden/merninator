import React, { cloneElement, useContext } from 'react';
import { AuthDispatchContext } from './auth/AuthState';
import { AppDispatchContext } from './app/AppState';
import {
  AuthActions,
  AuthActionTypes,
  AppActions,
  AppActionTypes,
  ProjectsActions,
  ProjectsActionTypes,
} from '@merninator/types';
import { ProjectsDispatchContext } from './projects/ProjectsState';

interface DispatchProviderSingleChildProps {
  // changed from type ReactNode to satisfy TS error:
  // type 'ReactNode' is not assignable to parameter of type 'ReactElement
  children: JSX.Element;
}
const isAuthAction = (action: AuthActions | AppActions | ProjectsActions): action is AuthActions =>
  // This not only returns the actionType parameter
  // but also a boolean stating whether or not the actionType is an auth action.
  Object.values(AuthActionTypes).includes(action.type as AuthActionTypes);

const isAppAction = (action: AppActions | ProjectsActions): action is AppActions =>
  Object.values(AppActionTypes).includes(action.type as AppActionTypes);

const isProjectAction = (action: ProjectsActions): action is ProjectsActions =>
  Object.values(ProjectsActionTypes).includes(action.type as ProjectsActionTypes);

export const DispatchProviderSingleChild: React.FC<DispatchProviderSingleChildProps> = ({ children }) => {
  const authDispatch = useContext(AuthDispatchContext);
  const appDispatch = useContext(AppDispatchContext);
  const projectsDispatch = useContext(ProjectsDispatchContext);

  const dispatch = (action: AuthActions | AppActions): void | Error => {
    // If the action is of the auth action type, dispatch
    return isAuthAction(action)
      ? authDispatch(action)
      : isAppAction(action)
      ? appDispatch(action)
      : isProjectAction(action)
      ? projectsDispatch(action)
      : new Error('Bad action: there is no reducer which handles that action.');
  };

  const childrenWithDispatch = cloneElement(children, { dispatch: dispatch });

  return <>{childrenWithDispatch}</>;
};
