import React from 'react';
import '@merninator/lib/src/themes/index.scss';
import { AuthState } from './context/auth/AuthState';
import { AppState } from './context/app/AppState';
import TodoPage from './components/pages/Projects/ProjectsPage';
import LoginRHF from './components/pages/Login/LoginRHF';
import RegisterRHF from './components/pages/Register/RegisterRHF';
// import ConditionalRoute from './components/auth/ConditionalRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import './utils/faLib';
import StateRouter from './components/pages/StateRouter';
import { ProjectsState } from './context/projects/ProjectsState';

export const App: React.FC = () => {
  return (
    <div className="App">
      <AuthState>
        <AppState>
          <ProjectsState>
            <NavBar />
            <Router>
              <Switch>
                {/* <ConditionalRoute path="/todos" noUser="/login" component={TodoPage} /> */}
                {/* <ConditionalRoute path="/login" loggedIn="/home" component={Login} /> */}
                <ProtectedRoute path="/todos" unauthedRedirectPath="/login" component={TodoPage} />
                <Route exact path="/login" component={LoginRHF} />
                <Route exact path="/register" component={RegisterRHF} />
                <Route exact path="/" component={StateRouter} />
              </Switch>
            </Router>
          </ProjectsState>
        </AppState>
      </AuthState>
    </div>
  );
};
