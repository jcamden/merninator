import { AuthdHome, LoadingLogo, LoginRHF, Profile, ProjectsPage, RegisterRHF, UnauthdHome } from '@merninator/lib';
import { AppActionTypes, AppActions, AuthActions, ProjectsActions } from '@merninator/types';
import React, { useContext } from 'react';

import { AppStateContext } from '../context/app/AppState';
import { AuthStateContext } from '../context/auth/AuthState';
import { ProjectsStateContext } from '../context/projects/ProjectsState';
import { GOOGLE_CLIENT_ID, SERVER } from '../settings';
import { loginUser, registerUser } from '../utils/authUtils';
import { CheckAuth } from './auth/CheckAuth';

interface StateRouterProps {
  dispatch: (arg0: AuthActions | AppActions | ProjectsActions) => void;
}

export const StateRouter: React.FC<StateRouterProps> = ({ dispatch }) => {
  const { page } = useContext(AppStateContext);
  // const appDispatch = useContext(AppDispatchContext);
  const { authLoading, authError, user, checkedAuth } = useContext(AuthStateContext);
  const { projects } = useContext(ProjectsStateContext);

  switch (page) {
    case 'home': {
      // You could also use two different states for authd home and unauthd home, but I think I like this approach using Check.
      // It nests the state routing essentially. The preInitAuth component prop is good for a landing page,
      // although it might actually be smart to move the preInitAuth component rendering to the global StateRouter.
      // Maybe I'll do that, actually.
      return (
        <CheckAuth
          preInitAuth={<LoadingLogo />}
          noUser={<UnauthdHome dispatch={dispatch} />}
          component={<AuthdHome dispatch={dispatch} />}
        />
      );
    }
    case 'login': {
      return (
        <LoginRHF
          dispatch={dispatch}
          loginUser={loginUser}
          googleClientId={GOOGLE_CLIENT_ID}
          authLoading={authLoading}
          authError={authError}
          user={user}
          checkedAuth={checkedAuth}
        />
      );
    }
    case 'register': {
      return (
        <RegisterRHF
          dispatch={dispatch}
          registerUser={registerUser}
          googleClientId={GOOGLE_CLIENT_ID}
          authLoading={authLoading}
          authError={authError}
          user={user}
          checkedAuth={checkedAuth}
        />
      );
    }
    case 'projects': {
      return <ProjectsPage dispatch={dispatch} user={user} projects={projects} server={SERVER} />;
    }
    case 'profile': {
      return <Profile dispatch={dispatch} />;
    }
    default: {
      // shouldn't be possible, but just in case.
      dispatch({ type: AppActionTypes.changePage, payload: 'home' });
      return (
        <CheckAuth
          preInitAuth={<LoadingLogo />}
          noUser={<UnauthdHome dispatch={dispatch} />}
          component={<AuthdHome dispatch={dispatch} />}
        />
      );
    }
  }
};
