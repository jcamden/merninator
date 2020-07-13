import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
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

// StateRouter.propTypes = {
//   user: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     givenName: PropTypes.string.isRequired,
//     familyName: PropTypes.string.isRequired,
//     page: PropTypes.shape({ title: PropTypes.string.isRequired, state: PropTypes.arrayOf(PropTypes.string) }),
//   }).isRequired,
// };
export default StateRouter;
