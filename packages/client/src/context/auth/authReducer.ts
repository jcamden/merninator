import { LoginState, LoginActions } from './types';

export default function authReducer(draft: LoginState, action: LoginActions): void {
  switch (action.type) {
    case 'field': {
      draft[action.fieldName] = action.payload;
      return;
    }
    case 'isLoading': {
      draft.isLoading = true;
      return;
    }
    case 'isNotLoading': {
      draft.isLoading = false;
      return;
    }
    case 'registerSuccess': {
      localStorage.setItem('token', action.payload.token);
      console.log('register success! Next, update state.');
      return;
    }
    case 'loginSuccess':
      localStorage.setItem('token', action.payload.token);
      draft.isLoggedIn = true;
      draft.user = action.payload.user;
      return;

    case 'userLoaded': {
      draft.isLoggedIn = true;
      draft.isLoading = false;
      draft.user = action.payload;
      return;
    }
    case 'loginFail':
      console.log(action.payload);
      return;

    // case 'login': {
    //   draft.error = '';
    //   draft.isLoading = true;
    //   return;
    // }
    // case 'success': {
    //   draft.isLoggedIn = true;
    //   draft.isLoading = false;
    //   return;
    // }
    // case 'error': {
    //   draft.error = 'Incorrect email or password!';
    //   draft.isLoggedIn = false;
    //   draft.isLoading = false;
    //   draft.email = '';
    //   draft.password = '';
    //   return;
    // }
    case 'authError': {
      draft.error = 'There was an authorization error.';
      draft.isLoggedIn = false;
      draft.isLoading = false;
      draft.email = '';
      draft.password = '';
      return;
    }
    // case 'logOut': {
    //   draft.isLoggedIn = false;
    //   return;
    // }

    case 'toggleTodoCompleted': {
      const index = draft.todos.findIndex(item => item.title === action.payload);
      draft.todos[index].completed = !draft.todos[index].completed;
      return;
    }
    default:
      return;
  }
}
