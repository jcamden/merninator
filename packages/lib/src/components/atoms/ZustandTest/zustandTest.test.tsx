import React from 'react';
import ReactDOM from 'react-dom';
import { ZustandTest } from './ZustandTest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ZustandTest />, div);
  ReactDOM.unmountComponentAtNode(div);
});
