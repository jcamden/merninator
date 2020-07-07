import { LoginState, LoginActions } from './types';

export default function authReducer(draft: LoginState, action: LoginActions): void {
  switch (action.type) {
    case 'field': {
      draft[action.fieldName] = action.payload;
      return;
    }
    case 'loading': {
      draft.loading = true;
      return;
    }
    // case 'isNotLoading': {
    //   draft.loading = false;
    //   return;
    // }
    case 'registerSuccess': {
      localStorage.setItem('token', action.payload.token);
      console.log('register success! Next, update state.');
      return;
    }
    case 'loginSuccess':
      localStorage.setItem('token', action.payload.token);
      draft.user = action.payload.user;
      return;
    case 'googleLoginSuccess':
      // localStorage.setItem('token', action.payload.token);
      console.log(action.payload.user);
      draft.user = action.payload.user;
      return;
    case 'userLoaded': {
      console.log('REDUCER USERLOADED');
      draft.loading = false;
      // update backend to fix this
      draft.user = action.payload.user;
      draft.checkedAuth = true;
      return;
    }
    case 'loginFail':
      console.log(action.payload);
      return;

    case 'authError': {
      draft.error = 'There was an authorization error.';
      draft.loading = false;
      draft.email = '';
      draft.password = '';
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
    default:
      return;
  }
}
