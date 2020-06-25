export interface Todos {
  [index: number]: { title: string; completed: boolean };
}

// export type Todos = {
//   title: string;
//   completed: boolean;
// };
// [];

export interface LoginState {
  [propName: string]: string | boolean | Todos;
  username: string;
  password: string;
  isLoading: boolean;
  error: string;
  isLoggedIn: boolean;
  variant: 'login' | 'forgetPassword';
  todos: {
    title: string;
    completed: boolean;
  }[];
}

export type LoginActions =
  | { type: 'login' | 'success' | 'error' | 'logOut' }
  | { type: 'field'; fieldName: string; payload: string }
  | { type: 'toggleTodoCompleted'; payload: string };
