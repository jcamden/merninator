import React, { useContext } from 'react';
import { AppStateContext } from '../../context/app/AppState';
import Home from './Home/Home';
import LoginRHF from './Login/LoginRHFState';
import RegisterRHF from './Register/RegisterRHFRoutes';
import TodoPage from './Todos/Todos';
import Profile from './Profile/Profile';

const StateRouter: React.FC = () => {
  const { page } = useContext(AppStateContext);

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

    default:
      // probably want to set page to home if you wind up here
      return <div>Something got messed up.</div>;
  }
};

export default StateRouter;
