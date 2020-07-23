import React, { useContext } from 'react';
import { AppStateContext, AppDispatchContext } from '../../context/app/AppState';
import Home from './Home/AuthdHome';
import LoginRHF from './Login/LoginRHF';
import RegisterRHF from './Register/RegisterRHF';
import ProjectsPage from './Projects/ProjectsPage';
import Profile from './Profile/Profile';
import Check from '../auth/Check';
import LoadingLogo from '../layout/LoadingLogo';
import UnauthdHome from './Home/UnauthdHome';
import AuthdHome from './Home/AuthdHome';

const StateRouter: React.FC = () => {
  const { page } = useContext(AppStateContext);
  const appDispatch = useContext(AppDispatchContext);

  switch (page) {
    case 'home': {
      // You could also use two different states for authd home and unauthd home, but I think I like this approach using Check.
      // It nests the state routing essentially. The preInitAuth component prop is good for a landing page,
      // although it might actually be smart to move the preInitAuth component rendering to the global StateRouter.
      // Maybe I'll do that, actually.
      return <Check preInitAuth={<LoadingLogo />} noUser={<UnauthdHome />} component={<AuthdHome />} />;
    }
    case 'login': {
      return <LoginRHF />;
    }
    case 'register': {
      return <RegisterRHF />;
    }
    case 'projects': {
      return <ProjectsPage />;
    }
    case 'profile': {
      return <Profile />;
    }
    default: {
      // shouldn't be possible, but just in case.
      appDispatch({ type: 'changePage', payload: 'home' });
      return <Home />;
    }
  }
};

export default StateRouter;
