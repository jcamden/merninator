export type Todos = {
  title: string;
  completed: boolean;
}[];

export type Login = (formData: { email: string; password: string }) => Promise<void>;

export interface User {
  _id: string;
  email: string;
  givenName: string;
  familyName: string;
  _v?: number;
}

export interface AuthStateInterface {
  user?: User;
  loading: boolean;
  error: string;
  todos: Todos;
  checkedAuth: boolean;
}

export interface LoginSuccess {
  success: boolean;
  user: User;
  token: string;
  expiresIn: string;
}

export type AuthActions =
  | {
      type: 'login' | 'logOut' | 'registerFail' | 'loading' | 'noToken';
    }
  | { type: 'registerSuccess'; payload: LoginSuccess }
  | { type: 'registerFail'; payload: string }
  | { type: 'loginSuccess'; payload: LoginSuccess }
  // | { type: 'googleLoginSuccess'; payload: { user: User } }
  | { type: 'loginFail'; payload: string }
  | { type: 'field'; fieldName: 'email' | 'password'; payload: string }
  | { type: 'toggleTodoCompleted'; payload: string }
  | { type: 'userLoaded'; payload: { user: User } }
  | { type: 'authError'; payload: string };
