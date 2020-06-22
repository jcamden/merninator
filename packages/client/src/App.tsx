import React from 'react';
import '@djinndex/lib/src/themes/index.scss';
import LoginReducer from './LoginReducerUseImmer';

const App: React.FC = () => {
  return (
    <div className="App">
      <LoginReducer />
    </div>
  );
};

export default App;
