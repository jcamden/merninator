export type Todos = {
  title: string;
  completed: boolean;
}[];

export type Login = (formData: { email: string; password: string }) => Promise<void>;

export interface LoginState {
  user?: {};
  token: string | null;
  email: string;
  password: string;
  loading: boolean;
  error: string;
  variant: 'login' | 'forgetPassword';
  todos: Todos;
  checkedAuth?: boolean;
}

export interface User {
  _id: string;
  email: string;
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
  | {
      type:
        | 'login'
        | 'logout'
        | 'success'
        | 'error'
        | 'logOut'
        | 'authError'
        | 'registerFail'
        | 'loading'
        | 'isNotLoading';
    }
  | { type: 'registerSuccess'; payload: LoginSuccess }
  | { type: 'registerFail'; payload: string }
  | { type: 'loginSuccess'; payload: LoginSuccess }
  | { type: 'loginFail'; payload: string }
  | { type: 'field'; fieldName: 'email' | 'password'; payload: string }
  | { type: 'toggleTodoCompleted'; payload: string }
  | { type: 'userLoaded'; payload: string }
  | { type: 'authError'; payload: string };
