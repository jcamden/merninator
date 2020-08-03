import React from 'react';
import ReactDOM from 'react-dom';

import { LoadingLogo } from './LoadingLogo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoadingLogo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
