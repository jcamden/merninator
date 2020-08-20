import {
  AppActionTypes,
  AppActions,
  AuthActionTypes,
  AuthActions,
  ProjectsActionTypes,
  ProjectsActions,
} from '@merninator/types';
import React, { cloneElement, useContext } from 'react';

import { AppDispatchContext, AppStateContext } from '../../context/app/AppState';
import { AuthDispatchContext } from '../../context/auth/AuthState';
import { AuthStateContext } from '../../context/auth/AuthState';
import { ProjectsDispatchContext } from '../../context/projects/ProjectsState';

interface NavBarPropProviderProps {
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

export const NavBarPropProvider: React.FC<NavBarPropProviderProps> = ({ children }) => {
  const authDispatch = useContext(AuthDispatchContext);
  const appDispatch = useContext(AppDispatchContext);
  const projectsDispatch = useContext(ProjectsDispatchContext);
  const { user } = useContext(AuthStateContext);
  const { page, onSetQsPage } = useContext(AppStateContext);

  // using our custom hook to set the qsPage to our default page or whatever page has been set to in AppStateContext
  // We'll clone the navBar passed in as a child and replace page prop value with the value of qsPage.
  // (Could also just call the navbar as a child here, but the cloning approach was used to genericize the provider.)
  // const [qsPage, onSetQsPage] = useQueryString('page', page);

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

  const navBarWithProps = cloneElement(children, {
    dispatch: dispatch,
    user: user,
    page: page,
    onSetQsPage: onSetQsPage,
  });

  return <>{navBarWithProps}</>;
};
