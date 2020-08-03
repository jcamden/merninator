import React from 'react';
import { action } from '@storybook/addon-actions';
import { NavBar } from './NavBar';
import { initialUser, fakeUser } from '../../../utils/index';

export default {
  title: 'organisms',
  component: NavBar,
};

export const navbarLoggedOut = () => <NavBar dispatch={action('dispatch')} user={initialUser} />;

export const navbarLoggedIn = () => <NavBar dispatch={action('dispatch')} user={fakeUser} />;
