export interface Todos {
  [index: number]: { title: string; completed: boolean };
}

// export type Todos = {
//   title: string;
//   completed: boolean;
// };
// [];

export type Login = (formData: { username: string; password: string }) => Promise<void>;

export interface LoginState {
  [propName: string]:
    | string
    | boolean
    | null
    | Todos
    | (() => Promise<void>)
    | ((formData: { username: string; password: string }) => Promise<void>)
    | undefined;
  token: string | null;
  username: string;
  password: string;
  isLoading: boolean;
  error: string;
  isLoggedIn: boolean;
  variant: 'login' | 'forgetPassword';
  // I don't get why I can't just type this using the Todos interface (above)
  todos: {
    title: string;
    completed: boolean;
  }[];
  loadUser?: () => Promise<void>;
  register?: (formData: { username: string; password: string }) => Promise<void>;
  login?: (formData: { username: string; password: string }) => Promise<void>;
}

export interface User {
  _id: string;
  username: string;
  hash: string;
  salt: string;
  __v: number;
}

export interface LoginSuccess {
  success: boolean;
  user: User;
  token: string;
  expiresIn: string;
}

export type LoginActions =
  | { type: 'login' | 'success' | 'error' | 'logOut' | 'authError' | 'registerFail' }
  | { type: 'registerSuccess'; payload: LoginSuccess }
  | { type: 'registerFail'; payload: string }
  | { type: 'loginSuccess'; payload: LoginSuccess }
  | { type: 'loginFail'; payload: string }
  | { type: 'field'; fieldName: string; payload: string }
  | { type: 'toggleTodoCompleted'; payload: string }
  | { type: 'userLoaded'; payload: string };
