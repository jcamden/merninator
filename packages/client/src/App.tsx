import React from 'react';
import '@merninator/lib/src/themes/index.scss';
import { AuthState } from './context/auth/AuthState';
import TodoPage from './components/pages/Todos/Todos';
// import LoginVanilla from './components/pages/LoginVanilla';
import LoginRHF from './components/pages/LoginRHF';
// import RegisterVanilla from './components/pages/RegisterVanilla';
import RegisterRHF from './components/pages/RegisterRHF';
import Home from './components/pages/Home';
// import ConditionalRoute from './components/auth/ConditionalRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import './utils/faLib';

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthState>
        <NavBar />
        <Router>
          <Switch>
            {/* <ConditionalRoute path="/todos" noUser="/login" component={TodoPage} /> */}
            <ProtectedRoute path="/todos" unauthedRedirectPath="/login" component={TodoPage} />
            {/* <ConditionalRoute path="/login" loggedIn="/home" component={Login} /> */}
            <Route exact path="/login" component={LoginRHF} />
            <Route exact path="/register" component={RegisterRHF} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </AuthState>
    </div>
  );
};

export default App;
