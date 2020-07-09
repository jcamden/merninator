import { AuthStateInterface, AuthActions } from './types';

export default function authReducer(draft: AuthStateInterface, action: AuthActions): void {
  switch (action.type) {
    // Here is a super useful method of using single reducer action for multiple state objects (such as the values of inputs)
    // For auth, I thought it made more sense to keep input state at the componenet level, but I left this example here for reference.
    //
    // case 'field': {
    //   draft[action.fieldName] = action.payload;
    //   return;
    // }
    case 'loading': {
      draft.loading = true;
      return;
    }
    case 'noToken': {
      draft.loading = false;
      draft.checkedAuth = true;
      return;
    }
    case 'userLoaded': {
      draft.loading = false;
      draft.user = action.payload.user;
      draft.checkedAuth = true;
      return;
    }
    case 'registerSuccess': {
      localStorage.setItem('token', action.payload.token);
      draft.user = action.payload.user;
      draft.loading = false;
      return;
    }
    case 'loginSuccess': {
      localStorage.setItem('token', action.payload.token);
      draft.user = action.payload.user;
      draft.loading = false;
      return;
    }
    case 'loginFail': {
      console.log(action.payload);
      return;
    }
    case 'authError': {
      draft.error = action.payload;
      draft.loading = false;
      draft.checkedAuth = true;
      return;
    }
    case 'logOut': {
      localStorage.removeItem('token');
      draft.user = undefined;
      return;
    }
    case 'toggleTodoCompleted': {
      const index = draft.todos.findIndex(item => item.title === action.payload);
      draft.todos[index].completed = !draft.todos[index].completed;
      return;
    }
    default: {
      return;
    }
  }
}
