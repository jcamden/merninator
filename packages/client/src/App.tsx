import React from 'react';
import '@djinndex/lib/src/themes/index.scss';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSignOutAlt,
  faPlusSquare,
  faLockOpen,
  faLock,
  faTimesCircle,
  faFilePdf,
  faSearch,
  faArrowCircleRight,
  faArrowCircleLeft,
  faSearchPlus,
  faSearchMinus,
  faFileAlt,
  faTools,
  faBook,
  faUserEdit,
  faBible,
  faStream,
  faEdit,
  faTrashAlt,
  faUserPlus,
  faFlag,
  faMinusCircle,
  faPlusCircle,
  faInfinity,
} from '@fortawesome/free-solid-svg-icons';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';

library.add(
  faGoogle,
  faSignOutAlt,
  faPlusSquare,
  faLockOpen,
  faLock,
  faTimesCircle,
  faFilePdf,
  faSearch,
  faArrowCircleRight,
  faArrowCircleLeft,
  faSearchPlus,
  faSearchMinus,
  faFileAlt,
  faTools,
  faBook,
  faUserEdit,
  faBible,
  faStream,
  faEdit,
  faTrashAlt,
  faUserPlus,
  faFlag,
  faMinusCircle,
  faPlusCircle,
  faInfinity,
);

import { GoogleLogin } from '@djinndex/lib';

const App: React.FC = () => {
  return (
    <div className="App">
      <GoogleLogin />
    </div>
  );
};

export default App;
