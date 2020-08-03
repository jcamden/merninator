import { action } from '@storybook/addon-actions';

export const initialUser = {
  self: 'guest',
  email: 'guest',
  givenName: 'guest',
  familyName: 'guest',
  _v: 1,
};

export const fakeUser = {
  self: '/user/0123456789',
  email: 'testicle@testies.com',
  givenName: 'Test',
  familyName: 'Ikelle',
  _v: 1,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const voidMaker = (params: any): void => {
  console.log(params);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const voidPromiseMaker = (params: any): Promise<void> => {
  action(params);
  return new Promise(() => {
    console.log('');
  });
};
