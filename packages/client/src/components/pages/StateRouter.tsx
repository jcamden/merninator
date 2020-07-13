import React, { useContext } from 'react';
import { AppStateContext, AppDispatchContext } from '../../context/app/AppState';
import Home from './Home/Home';
import LoginRHF from './Login/LoginRHFState';
import RegisterRHF from './Register/RegisterRHFRoutes';
import TodoPage from './Projects/Projects';
import Profile from './Profile/Profile';

const StateRouter: React.FC = () => {
  const { page } = useContext(AppStateContext);
  const appDispatch = useContext(AppDispatchContext);

  switch (page) {
    case 'home': {
      return <Home />;
    }
    case 'login': {
      return <LoginRHF />;
    }
    case 'register': {
      return <RegisterRHF />;
    }
    case 'projects': {
      return <TodoPage />;
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
