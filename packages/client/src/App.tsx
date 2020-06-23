import React from 'react';
import '@djinndex/lib/src/themes/index.scss';
import LoginReducerUseImmerContext from './LoginReducerUseImmerContext';

const App: React.FC = () => {
  return (
    <div className="App">
      <LoginReducerUseImmerContext />
    </div>
  );
};

export default App;
