import React from 'react';
import '@merninator/lib/src/themes/index.scss';
import { AuthState } from './context/auth/AuthState';
import TodoPage from './components/TodoPage';
import AuthTest from './components/auth/AuthTest';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from './components/navbar/NavBar';

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthState>
        <NavBar />
        <Router>
          <Switch>
            <ProtectedRoute path="/todos" unauthedRedirectPath="/login" component={TodoPage} />
            <Route exact path="/login" component={AuthTest} />
          </Switch>
        </Router>
      </AuthState>
    </div>
  );
};

export default App;
