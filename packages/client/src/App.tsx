import '@merninator/lib/src/themes/index.scss';

import './utils/faLib';

import { NavBar } from '@merninator/lib';
import React from 'react';
// import TodoPage from './components/pages/Projects/ProjectsPage';
// import LoginRHF from './components/pages/Login/LoginRHF';
// import RegisterRHF from './components/pages/Register/RegisterRHF';
// import ConditionalRoute from './components/auth/ConditionalRoute';
// import ProtectedRoute from './components/auth/ProtectedRoute';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { DispatchWrappedStateRouter } from './components/hoc/DispatchWrappedStateRouter';
import { NavBarPropProvider } from './components/hoc/NavBarPropProvider';
import { AppState } from './context/app/AppState';
import { AuthState } from './context/auth/AuthState';
import { ProjectsState } from './context/projects/ProjectsState';

export const App: React.FC = () => {
  return (
    <div className="App">
      <AuthState>
        <AppState>
          <ProjectsState>
            <NavBarPropProvider>
              <NavBar
                dispatch={(): void => {
                  console.log('dispatch not replaced');
                }}
                user={{ self: 'init', email: 'init', givenName: 'init', familyName: 'init', _v: 0 }}
              />
            </NavBarPropProvider>
            <Router>
              <Switch>
                {/* <ConditionalRoute path="/todos" noUser="/login" component={TodoPage} /> */}
                {/* <ConditionalRoute path="/login" loggedIn="/home" component={Login} /> */}
                {/* <ProtectedRoute path="/todos" unauthedRedirectPath="/login" component={TodoPage} />
                <Route exact path="/login" component={LoginRHF} />
                <Route exact path="/register" component={RegisterRHF} /> */}
                <Route exact path="/" component={DispatchWrappedStateRouter} />
              </Switch>
            </Router>
          </ProjectsState>
        </AppState>
      </AuthState>
    </div>
  );
};
