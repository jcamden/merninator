import React from 'react';
import '@djinndex/lib/src/themes/index.scss';
import './App.css';

import { GoogleLogin, StateTest } from '@djinndex/lib';

const App: React.FC = () => {
  return (
    <div className="App">
      <GoogleLogin />
      <StateTest />
    </div>
  );
};

export default App;
