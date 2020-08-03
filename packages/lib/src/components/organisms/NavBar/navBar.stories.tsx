import { action } from '@storybook/addon-actions';
import React from 'react';

import { fakeUser, initialUser } from '../../../utils/index';
import { NavBar } from './NavBar';

export default {
  title: 'organisms',
  component: NavBar,
};

export const navbarLoggedOut = () => <NavBar dispatch={action('dispatch')} user={initialUser} />;

export const navbarLoggedIn = () => <NavBar dispatch={action('dispatch')} user={fakeUser} />;
