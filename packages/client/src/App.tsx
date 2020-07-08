import React from 'react';
import '@merninator/lib/src/themes/index.scss';
import { AuthState } from './context/auth/AuthState';
import TodoPage from './components/TodoPage';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import './utils/faLib';

import Register from './components/pages/Register';

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthState>
        <NavBar />
        <Router>
          <Switch>
            <ProtectedRoute path="/todos" unauthedRedirectPath="/login" component={TodoPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </AuthState>
    </div>
  );
};

export default App;
