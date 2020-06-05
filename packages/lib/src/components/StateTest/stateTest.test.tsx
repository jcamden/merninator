import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from './GoogleLogin';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GoogleLogin />, div);
  ReactDOM.unmountComponentAtNode(div);
});
