import { ensure } from '../../utils';
import { LoginState, LoginActions } from './types';

export default function authReducer(draft: LoginState, action: LoginActions): void {
  // note: we don't destructure draft since we are actually mutating it
  switch (action.type) {
    case 'field': {
      // standard immer(but we be curryin now)
      // return produce<LoginState>(state, draft => {
      //   draft[action.fieldName] = action.payload;
      // });

      draft[action.fieldName] = action.payload;
      return;
    }
    case 'login': {
      draft.error = '';
      draft.isLoading = true;
      return;
    }
    case 'success': {
      draft.isLoggedIn = true;
      draft.isLoading = false;
      return;
    }
    case 'error': {
      draft.error = 'Incorrect username or password!';
      draft.isLoggedIn = false;
      draft.isLoading = false;
      draft.username = '';
      draft.password = '';
      return;
    }
    case 'logOut': {
      draft.isLoggedIn = false;
      return;
    }

    case 'toggleTodoCompleted': {
      const index = ensure(
        draft.todos.findIndex(item => item.title === action.payload),
        `couldn't find todo ${action.payload}`,
      );
      console.log(index);
      console.log(draft.todos[index].completed);
      draft.todos[index].completed = !draft.todos[index].completed;
      console.log(draft.todos[index].completed);
      return;
    }
    default:
      return;
  }
}
