import { AuthStateInterface, AuthActions } from './types';

export const authReducer = (draft: AuthStateInterface, action: AuthActions): void => {
  switch (action.type) {
    // Here is a super useful method of using single reducer action for multiple state objects (such as the values of inputs)
    // For auth, I thought it made more sense to keep input state at the componenet level, but I left this example here for reference.
    //
    // case 'field': {
    //   draft[action.fieldName] = action.payload;
    //   return;
    // }
    case 'authLoading': {
      draft.authLoading = true;
      return;
    }
    case 'authNotLoading': {
      draft.authLoading = false;
      return;
    }
    case 'noToken': {
      draft.checkedAuth = true;
      draft.authLoading = false;
      return;
    }
    case 'userLoaded': {
      draft.user = action.payload.user;
      draft.checkedAuth = true;
      draft.authLoading = false;
      return;
    }
    case 'registerSuccess': {
      localStorage.setItem('token', action.payload.token);
      draft.user = action.payload.user;
      draft.authLoading = false;
      draft.authError = '';
      return;
    }
    case 'loginSuccess': {
      localStorage.setItem('token', action.payload.token);
      draft.user = action.payload.user;
      draft.authLoading = false;
      draft.authError = '';
      return;
    }
    case 'authError': {
      draft.authError = action.payload;
      draft.checkedAuth = true;
      draft.authLoading = false;
      return;
    }
    case 'logOut': {
      localStorage.removeItem('token');
      draft.user = {
        self: 'guest',
        email: 'guest',
        givenName: 'guest',
        familyName: 'guest',
      };
      return;
    }
    default: {
      return;
    }
  }
};
