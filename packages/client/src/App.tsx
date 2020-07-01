import React from 'react';
import '@merninator/lib/src/themes/index.scss';
// import LoginReducerUseImmerContext from './LoginReducerUseImmerContext';
import { AuthState } from './context/auth/AuthState';
import TodoPage from './components/TodoPage';
import AuthTest from './components/auth/AuthTest';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <LoginReducerUseImmerContext /> */}
      <AuthState>
        <Router>
          <Switch>
            <ProtectedRoute unauthedRedirectPath="/login" path="/todos" component={TodoPage} />
            <Route exact path="/login" component={AuthTest} />
          </Switch>
        </Router>
      </AuthState>
    </div>
  );
};

export default App;
