import { action } from '@storybook/addon-actions';
import React from 'react';
import ReactDOM from 'react-dom';

import { fakeUser, initialUser } from '../../../utils';
import { NavBar } from './NavBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavBar dispatch={action('dispatch')} user={initialUser} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders properly with a user', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavBar dispatch={action('dispatch')} user={fakeUser} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
