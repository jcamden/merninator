import { LoginRHFModal, RegisterRHFModal } from '@merninator/lib';
import {
  AppActionTypes,
  AppActions,
  AuthActionTypes,
  AuthActions,
  ProjectsActionTypes,
  ProjectsActions,
} from '@merninator/types';
import React, { useContext } from 'react';

import { AppStateContext } from '../../context/app/AppState';
import { AppDispatchContext } from '../../context/app/AppState';
import { AuthStateContext } from '../../context/auth/AuthState';
import { AuthDispatchContext } from '../../context/auth/AuthState';
import { ProjectsDispatchContext } from '../../context/projects/ProjectsState';
import { loginUserModal, registerUserModal } from '../../utils/authUtils';

const isAuthAction = (action: AuthActions | AppActions | ProjectsActions): action is AuthActions =>
  // This not only returns the actionType parameter
  // but also a boolean stating whether or not the actionType is an auth action.
  Object.values(AuthActionTypes).includes(action.type as AuthActionTypes);

const isAppAction = (action: AppActions | ProjectsActions): action is AppActions =>
  Object.values(AppActionTypes).includes(action.type as AppActionTypes);

const isProjectAction = (action: ProjectsActions): action is ProjectsActions =>
  Object.values(ProjectsActionTypes).includes(action.type as ProjectsActionTypes);

export const ModalProvider: React.FC = () => {
  const { modal } = useContext(AppStateContext);
  const { authLoading, authError, user, checkedAuth } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const appDispatch = useContext(AppDispatchContext);
  const projectsDispatch = useContext(ProjectsDispatchContext);

  const dispatch = (action: AuthActions | AppActions | ProjectsActions): void | Error => {
    // If the action is of the auth action type, dispatch
    return isAuthAction(action)
      ? authDispatch(action)
      : isAppAction(action)
      ? appDispatch(action)
      : isProjectAction(action)
      ? projectsDispatch(action)
      : new Error('Bad action: there is no reducer which handles that action.');
  };

  return (
    <>
      {modal === 'login' && (
        <LoginRHFModal
          dispatch={dispatch}
          loginUser={loginUserModal}
          googleClientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? 'no Google clientID'}
          authLoading={authLoading}
          authError={authError}
          checkedAuth={checkedAuth}
        />
      )}
      {modal === 'register' && (
        <RegisterRHFModal
          dispatch={dispatch}
          registerUser={registerUserModal}
          googleClientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? 'no Google clientID'}
          authLoading={authLoading}
          authError={authError}
          user={user}
          checkedAuth={checkedAuth}
        />
      )}
    </>
  );
};
