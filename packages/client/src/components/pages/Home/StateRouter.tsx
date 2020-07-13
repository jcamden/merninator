import React, { useContext } from 'react';
import { AppStateContext } from '../../../context/app/AppState';
import Home from './Home';
import LoginRHF from '../Login/LoginRHFState';
import RegisterRHF from '../Register/RegisterRHFRoutes';

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

    default:
      // probably want to set page to home if you wind up here
      return <div>Something got messed up.</div>;
  }
};

export default StateRouter;
