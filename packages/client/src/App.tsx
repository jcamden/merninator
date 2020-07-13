import React from 'react';
import '@merninator/lib/src/themes/index.scss';
import { AuthState } from './context/auth/AuthState';
import { AppState } from './context/app/AppState';
import TodoPage from './components/pages/Todos/Todos';
import LoginRHF from './components/pages/Login/LoginRHFState';
import RegisterRHF from './components/pages/Register/RegisterRHFRoutes';
import Home from './components/pages/Home/Home';
// import ConditionalRoute from './components/auth/ConditionalRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import './utils/faLib';
import StateRouter from './components/pages/Home/StateRouter';

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthState>
        <AppState>
          <NavBar />
          <Router>
            <Switch>
              {/* <ConditionalRoute path="/todos" noUser="/login" component={TodoPage} /> */}
              <ProtectedRoute path="/todos" unauthedRedirectPath="/login" component={TodoPage} />
              {/* <ConditionalRoute path="/login" loggedIn="/home" component={Login} /> */}
              <Route exact path="/login" component={LoginRHF} />
              <Route exact path="/register" component={RegisterRHF} />
              <Route exact path="/" component={StateRouter} />
            </Switch>
          </Router>
        </AppState>
      </AuthState>
    </div>
  );
};

export default App;
