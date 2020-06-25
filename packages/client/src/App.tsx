import React from 'react';
import '@merninator/lib/src/themes/index.scss';
// import LoginReducerUseImmerContext from './LoginReducerUseImmerContext';
import AuthState from './context/auth/AuthState';
import TodoPage from './components/TodoPage';
import AuthTest from './components/auth/AuthTest';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <LoginReducerUseImmerContext /> */}
      <AuthState>
        <AuthTest />
        <TodoPage />
      </AuthState>
    </div>
  );
};

export default App;
