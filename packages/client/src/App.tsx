import React from 'react';
import '@merninator/lib/src/themes/index.scss';
import LoginReducerUseImmerContext from './LoginReducerUseImmerContext';
// import LoginReducerUseImmer from './LoginReducerUseImmer';

const App: React.FC = () => {
  return (
    <div className="App">
      <LoginReducerUseImmerContext />
      {/* <LoginReducerUseImmer /> */}
    </div>
  );
};

export default App;
